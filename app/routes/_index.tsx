import type {
  ActionFunctionArgs
} from '@remix-run/node';
import {
  json,
  redirect,
  useFetcher,
  useLoaderData
} from '@remix-run/react';
import { IconBolt, IconBoxMultiple, IconCoinFilled, IconSettingsCheck } from '@tabler/icons-react';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import {
  ActionContextProvider,
  useForm,
} from '~/components/ActionContextProvider';
import { AttributeBox } from '~/components/AttributeBox';
import { ClaimPage } from '~/components/ClaimPage';
import { Footer } from '~/components/Footer';
import { LargeHeader } from '~/components/LargeHeader';
import { IndexMarquee } from '~/components/Marquee';
import { Ornament } from '~/components/Ornament';
import { PrimaryButtonLink } from '~/components/PrimaryButton';
import { SocialMediaTiles } from '~/components/SocialMediaTiles';
import { Toolbar } from '~/components/Toolbar';
import { prisma } from '~/db.server';
import { badRequest, processBadRequest } from '~/models/core.validations';
import { Env } from '~/models/environment.server';
import { getErrorMessage } from '~/models/errors';
import { getRawFormFields } from '~/models/forms';
import { AppLinks } from '~/models/links';
import { getUserIpAddress } from '~/models/user.server';
import { useOptionalUser } from '~/utils';

import NoCodingImage from '~/../public/images/no_coding_required.png';
import PickThemeImage from '~/../public/images/pick_theme.png';
// import { NoCodingRequired } from '~/components/NoCodingRequired';

export async function loader() {
  return json({ url: Env.SERVER_URL });
}

const Schema = z.object({
  newPageName: z
    .string()
    .min(3, 'Please use at least 3 characters for your page name')
    .max(50, 'Please use at most 50 characters for your page name'),
});
export async function action({ request }: ActionFunctionArgs) {
  try {
    const fields = await getRawFormFields(request);
    const result = Schema.safeParse(fields);
    if (!result.success) {
      return processBadRequest(result.error, fields);
    }
    const { newPageName } = result.data;

    const ipAddress = getUserIpAddress(request);

    if (ipAddress) {
      const tempRecord = await prisma.tempPageName.findFirst({
        where: { ipAddress },
      });
      if (tempRecord) {
        await prisma.tempPageName.update({
          where: { id: tempRecord.id },
          data: { pageName: newPageName },
        });
      } else {
        await prisma.tempPageName.create({
          data: {
            ipAddress,
            pageName: newPageName,
          },
        });
      }
    }

    return redirect(AppLinks.Signup);
  } catch (error) {
    return badRequest({ formError: getErrorMessage(error) });
  }
}

export default function Index() {
  const currentUser = useOptionalUser();
  const { url } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();

  const { getNameProp, isProcessing } = useForm(fetcher, Schema);

  return (
    <div className="flex flex-col items-stretch px-4 lg:px-0">
      <Toolbar isLoggedIn={!!currentUser} />
      <div className="flex-col items-stretch relative border-b border-stone-600 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 px-2 py-8 pb-16">
        <div className="gap-8 flex flex-col justify-center items-stretch py-6 px-16">
          <div className="flex flex-col items-start">
            <SocialMediaTiles />
            <LargeHeader className="text-balance">Launch a store and sell from your social media bio</LargeHeader>
          </div>
          <div className="text-lg text-black/80 leading-relaxed font-light flex flex-col items-start gap-0 text-center lg:text-start">
            <span>Gather all of your products, services and courses on a simple page&nbsp;</span>
            <span>accessible direcly from your link-in-bio. Create your store in minutes,</span>
            <span>reach your audience directly and start making money today.</span>
          </div>
          <fetcher.Form method="post" className="flex flex-col items-stretch">
            <ActionContextProvider
              {...fetcher.data}
              isSubmitting={isProcessing}
            >
              <ClaimPage
                inputName={getNameProp('newPageName').name}
                url={url}
              />
            </ActionContextProvider>
          </fetcher.Form>
        </div>
        <div className="flex flex-col justify-center items-center py-6 mr-[10rem] relative shrink-0 skew-y-6 -skew-x-6 translate-y-10">
          <div className="flex flex-col items-stretch justify-end absolute top-0 right-0 z-30 -translate-x-32 -translate-y-32 aspect-[9/16] gap-2">
            <div className="w-72 aspect-[5/2] bg-black/10 rounded-xl backdrop-blur-sm" />
            <div className="w-72 aspect-[5/1] bg-black/10 rounded-xl backdrop-blur-sm" />
            <div className="w-72 aspect-[5/1] bg-black/10 rounded-xl backdrop-blur-sm" />
          </div>
          <div className="w-72 aspect-[9/16] absolute top-0 right-0 -translate-x-20 -translate-y-20 bg-black/10 rounded-3xl backdrop-blur-sm z-20" />
          <div className="w-72 aspect-[9/16] absolute top-0 right-0 -translate-x-10 -translate-y-10 bg-black/10 rounded-3xl backdrop-blur-sm z-10" />
          <div className="flex flex-col items-start justify-start absolute top-0 right-0 z-0 aspect-[9/16] gap-2 translate-x-20">
            <div className="w-36 aspect-square bg-black/10 rounded-full backdrop-blur-sm" />
            <div className="w-36 aspect-square bg-black/10 rounded-full backdrop-blur-sm" />
            <div className="w-36 aspect-square bg-black/10 rounded-full backdrop-blur-sm" />
          </div>
        </div>
      </div>
      <IndexMarquee />
      <div className="grid lg:grid-cols-5 grid-cols-1">
        <div className="flex flex-col justify-center items-center px-16 lg:col-span-2">
          <div className="flex flex-col items-start gap-6">
            <Ornament />
            <LargeHeader className="text-balance">Why choose Directly Bio?</LargeHeader>
          </div>
        </div>
        <div className="grid grid-cols-2 p-16 gap-8 lg:col-span-3">
          <AttributeBox className="bg-sky-300" title="Customizable" desc="Several options to design your page and make it suit your particular brand" Graphic={<IconSettingsCheck size={48} />} />
          <AttributeBox className="bg-yellow-300" title="Powerful" desc="Lots of block layouts to choose from and greater options for how to organize your content" Graphic={<IconBolt size={48} />} />
          <AttributeBox className="bg-orange-300" title="Affordable" desc="More affordable than most link-in-bio platforms" Graphic={<IconCoinFilled size={48} />} />
          <AttributeBox className="bg-red-300" title="Multiple Profiles" desc="Manage multiple profiles easily with the Pro plan" Graphic={<IconBoxMultiple size={48} />} />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 bg-stone-600 p-[1px] gap-[1px]">
        <div className="flex flex-col justify-center items-center px-16 py-16 bg-white">
          <div className="flex flex-col items-start gap-6 py-6">
            <Ornament />
            <LargeHeader className="text-balance">Pick a theme or design your own</LargeHeader>
            <span className="text-stone-600 leading-loose font-light">
              Save time by choosing among our preset themes.
              <br />
              We`ve made sure out themes look great.
            </span>
            <PrimaryButtonLink to={AppLinks.Plans} className="rounded-full px-6 py-4">
              Choose Theme
            </PrimaryButtonLink>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center bg-purple-300 py-16 lg:-order-1">
          <div className="flex flex-col justify-center items-stretch w-[60%]">
            <img src={PickThemeImage} alt="Pick theme" />
            {/* <PickThemeDisplayCard /> */}
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 bg-stone-600 p-[1px] gap-[1px]">
        <div className={twMerge('flex flex-col justify-center items-center px-16 py-16 bg-white')}>
          <div className="flex flex-col items-start gap-6 py-6">
            <Ornament className="bg-yellow-400" />
            <LargeHeader className="text-balance">No coding required</LargeHeader>
            <span className="text-stone-600 leading-loose font-light text-balance text-lg">
              Use blocks to design and customize your content. Group related blocks into folders to organize them.
              Everything is quick to load and SEO optimised.
            </span>
            <PrimaryButtonLink to={AppLinks.Plans} className="rounded-full px-6 py-4">
              Start building
            </PrimaryButtonLink>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center bg-yellow-300 py-8">
          {/* <div className="flex flex-col justify-center items-center"> */}
          <div className="flex flex-col justify-center items-center w-[80%]">
            <img src={NoCodingImage} alt="No coding required" />
            {/* <NoCodingRequired /> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-sky-300 py-16 gap-6">
        <div className="flex flex-col justify-center items-center gap-2 pt-6">
          <Ornament className="bg-yellow-300" />
          <LargeHeader>Get organized with pages</LargeHeader>
        </div>
        <span className="text-black font-light text-lg text-balance text-center leading-loose">
          Use our pages infrastructure to organize your content and turn your profile into <br />
          a simple yet effective website.
        </span>
        <div className="w-2/3 bg-black/10 rounded-lg min-h-[600px] mb-6">
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 border-b border-stone-600 py-12">
        <div className="flex flex-col items-start justify-center gap-4 px-16 py-16 lg:col-span-2">
          <Ornament />
          <LargeHeader className="text-balance">Who uses Directly Bio?</LargeHeader>
          <span className="text-balance leading-relaxed font-light">From artists, creators to small business owners and more use Directly Bio to establish their online presence.</span>
          <PrimaryButtonLink to={AppLinks.Signup}>
            Get Started
          </PrimaryButtonLink>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-6 lg:col-span-3 py-16">
          {[1, 2, 3].map(num => (
            <div key={num} className="bg-black/10 rounded-xl aspect-auto w-full min-h-[400px] -skew-x-3 skew-y-3">
            </div>
          ))}
        </div>
      </div>
      <IndexMarquee />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-purple-300">
        <div className="flex flex-col justify-center items-stretch p-12 px-16">
          <div className="bg-black/10 rounded-xl aspect-square" />
        </div>
        <div className="flex flex-col items-stretch justify-center py-16 pr-16 gap-12">
          <div className="flex flex-col justify-center items-center">
            <LargeHeader>Try Directly Bio!</LargeHeader>
          </div>
          <ClaimPage
            inputName={getNameProp('newPageName').name}
            url={url}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}