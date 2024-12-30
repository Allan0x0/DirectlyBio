import type { ActionFunctionArgs } from '@remix-run/node';

import { Link, useFetcher } from '@remix-run/react';
import { z } from 'zod';

import {
  ActionContextProvider,
  useForm,
} from '~/components/ActionContextProvider';
import { FormTextField } from '~/components/FormInput';
import { InlineAlert } from '~/components/InlineAlert';
import { LogoLinkWithText } from '~/components/Logo';
import { PrimaryButton } from '~/components/PrimaryButton';
import { prisma } from '~/db.server';
import { EmailSchema } from '~/models/core.validations';
import { getErrorMessage } from '~/models/errors';
import { getRawFormFields, hasFormError } from '~/models/forms';
import { badRequest, processBadRequest } from '~/models/forms.server';
import { isValidPassword } from '~/models/hashing.server';
import { AppLinks } from '~/models/links';
import { createUserSession } from '~/session.server';

const Schema = z.object({
  email: EmailSchema,
  password: z.string(),
});
export async function action({ request }: ActionFunctionArgs) {
  try {
    const fields = await getRawFormFields(request);
    const result = Schema.safeParse(fields);
    if (!result.success) {
      return processBadRequest(result.error, fields);
    }
    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, password: { select: { hash: true } } },
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await isValidPassword({
      inputPassword: password,
      hashedPassword: user.password?.hash || '',
    });
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    return createUserSession({
      redirectTo: AppLinks.Home,
      remember: false,
      request,
      userId: user.id,
    });
  } catch (error) {
    return badRequest({ formError: getErrorMessage(error) });
  }
}

export default function JoinPage() {
  const fetcher = useFetcher<typeof action>();

  const { isProcessing, getNameProp } = useForm(fetcher, Schema);

  return (
    <div className="flex flex-col justify-center items-center p-6 h-full bg-[#282934] text-white">
      <div className="flex flex-col items-stretch rounded-2xl p-6 w-full md:w-[60%] lg:w-[40%]">
        <div className="flex flex-col justify-center items-center py-4">
          <LogoLinkWithText darkMode />
        </div>
        <div className="flex flex-col justify-center items-center py-4">
          <span className="text-white/60 text-base text-center font-light">
            Welcome back! Sign in to your account.
          </span>
        </div>
        <fetcher.Form
          method="post"
          className="flex flex-col items-stretch gap-8 py-6 p-4 pb-4"
        >
          <ActionContextProvider {...fetcher.data} isSubmitting={isProcessing}>
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
                {isProcessing ? 'Signing in...' : 'Sign in'}
              </PrimaryButton>
              <div className="flex flex-col justify-center items-center">
                <span className="text-white text-sm font-light">
                  Don't have an account yet?{' '}
                  <Link to={AppLinks.Join} className="underline">
                    Sign Up
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
