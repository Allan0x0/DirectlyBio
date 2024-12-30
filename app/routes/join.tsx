import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

import { Link, redirect, useFetcher, useLoaderData } from '@remix-run/react';
import { z } from 'zod';

import {
  ActionContextProvider,
  useForm,
} from '~/components/ActionContextProvider';
import { FormTextField } from '~/components/FormInput';
import { InlineAlert } from '~/components/InlineAlert';
import { LogoLinkWithText } from '~/components/Logo';
import { PrimaryButton } from '~/components/PrimaryButton';
import { EmailSchema, getQueryParams } from '~/models/core.validations';
import { Env } from '~/models/environment.server';
import { getErrorMessage } from '~/models/errors';
import { getRawFormFields, hasFormError } from '~/models/forms';
import { badRequest, processBadRequest } from '~/models/forms.server';
import { AppLinks } from '~/models/links';
import { createUser } from '~/models/user.server';
import { createUserSession, getUserId } from '~/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  const { pageName } = getQueryParams(request.url, ['pageName']);
  if (userId) {
    return redirect(AppLinks.Home);
  }
  return { pageName, url: Env.SERVER_URL };
}

const Schema = z
  .object({
    pageName: z
      .literal('')
      .or(
        z.string().min(3, 'Please use at least 3 characters for the page name'),
      ),
    email: EmailSchema,
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((arg) => arg.password === arg.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export async function action({ request }: ActionFunctionArgs) {
  try {
    const fields = await getRawFormFields(request);
    const result = Schema.safeParse(fields);
    if (!result.success) {
      return processBadRequest(result.error, fields);
    }
    const { pageName, email, password } = result.data;

    const userOrError = await createUser(email, password, pageName);
    if (userOrError instanceof Error) {
      throw userOrError;
    }
    const user = userOrError;

    return createUserSession({
      redirectTo: AppLinks.Onboarding.ChoooseTemplate,
      remember: false,
      request,
      userId: user.id,
    });
  } catch (error) {
    return badRequest({ formError: getErrorMessage(error) });
  }
}

export default function JoinPage() {
  const { url, pageName } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();

  const { isProcessing, getNameProp } = useForm(fetcher, Schema);

  return (
    <div className="flex flex-col justify-center items-center p-6 h-full bg-[#282934] text-white">
      <div className="flex flex-col items-stretch rounded-2xl p-6 w-full md:w-[60%] lg:w-[40%]">
        <div className="flex flex-col justify-center items-center py-4">
          <LogoLinkWithText darkMode />
        </div>
        {!!pageName && (
          <div className="flex flex-col justify-center items-center py-6">
            <span className="text-white/60 text-base text-center font-light">
              Claim{' '}
              <b>
                {url}/{pageName}
              </b>{' '}
              to begin making your page
            </span>
          </div>
        )}
        <fetcher.Form
          method="post"
          className="flex flex-col items-stretch gap-8 py-6 p-4 pb-4"
        >
          <ActionContextProvider {...fetcher.data} isSubmitting={isProcessing}>
            <input
              type="hidden"
              {...getNameProp('pageName')}
              value={pageName || ''}
            />
            <div className="flex flex-col items-stretch gap-4">
              <FormTextField
                {...getNameProp('email')}
                type="email"
                label="Email"
                placeholder="email@example.com"
                required
              />
              <FormTextField
                {...getNameProp('password')}
                type="password"
                label="Password"
                placeholder="**********"
                required
              />
              <FormTextField
                {...getNameProp('confirmPassword')}
                type="password"
                label="Re-Enter Password"
                placeholder="**********"
                required
              />
            </div>
            {hasFormError(fetcher.data) && (
              <InlineAlert>{fetcher.data.formError}</InlineAlert>
            )}
            <div className="flex flex-col items-stretch gap-4">
              <PrimaryButton
                type="submit"
                disabled={isProcessing}
                className="py-3"
              >
                {isProcessing ? 'Processing...' : 'Create Account'}
              </PrimaryButton>
              <div className="flex flex-col justify-center items-center">
                <span className="text-white text-sm font-light">
                  Already have an account?{' '}
                  <Link to={AppLinks.Login} className="underline">
                    Sign In
                  </Link>
                </span>
              </div>
            </div>
          </ActionContextProvider>
        </fetcher.Form>
      </div>
    </div>
  );
}
