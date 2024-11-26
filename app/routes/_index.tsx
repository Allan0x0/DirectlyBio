import type {
  ActionFunctionArgs
} from '@remix-run/node';
import {
  json,
  redirect,
  useFetcher,
  useLoaderData
} from '@remix-run/react';
import { IconBoxMultiple, IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconBrandWhatsapp, IconBrandX, IconBrandYoutube, IconCoinFilled, IconGridDots, IconSettingsCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import latest from '~/../public/images/latest.png';
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
import { PhoneContainer } from '~/components/PhoneContainer';
import { PrimaryButtonLink } from '~/components/PrimaryButton';
import { SocMediaBadge } from '~/components/SocMediaBadge';
import { Toolbar } from '~/components/Toolbar';
import { prisma } from '~/db.server';
import { badRequest, processBadRequest } from '~/models/core.validations';
import { Env } from '~/models/environment.server';
import { getErrorMessage } from '~/models/errors';
import { getRawFormFields } from '~/models/forms';
import { AppLinks } from '~/models/links';
import { getUserIpAddress } from '~/models/user.server';
import { useOptionalUser } from '~/utils';

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

const firstRow: [string, string, number][] = [];
const secondRow: [string, string, number][] = [];
const thirdRow: [string, string, number][] = [];
for (let i = 0; i < 15; i++) {
  firstRow.push(["Peter Jacobson", 'glasses_trubcp', 240,]);
  secondRow.push(["Jonathan Haidt", 'glasses_trubcp', 139,]);
  thirdRow.push(["NIcholas Mareno", 'glasses_trubcp', 459,]);
}

export default function Index() {
  const currentUser = useOptionalUser();
  const { url } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();

  const { getNameProp, isProcessing } = useForm(fetcher, Schema);

  const images = [latest];
  // const images = [sb_one, sb_two, sb_three, sb_four, sb_five];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex flex-col items-stretch px-4 md:px-0">
      <Toolbar isLoggedIn={!!currentUser} />
      <div className="flex-col items-stretch relative border-b border-stone-600 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 px-2">
        <div className="gap-8 flex flex-col justify-center items-stretch py-6 px-16">
          <div className="flex flex-col items-start">
            <div className="flex flex-row items-center gap-2 pb-6">
              <SocMediaBadge className="-mr-6">
                <IconBrandInstagram className="text-purple-600" />
              </SocMediaBadge>
              <SocMediaBadge className="-mr-6">
                <IconBrandTiktok className="text-black" />
              </SocMediaBadge>
              <SocMediaBadge className="-mr-6">
                <IconBrandX className="text-sky-400" />
              </SocMediaBadge>
              <SocMediaBadge className="-mr-6">
                <IconBrandWhatsapp className="text-green-600" />
              </SocMediaBadge>
              <SocMediaBadge className="-mr-6">
                <IconBrandYoutube className="text-red-600" />
              </SocMediaBadge>
              <SocMediaBadge className="-mr-6">
                <IconBrandFacebook className="text-sky-600" />
              </SocMediaBadge>
            </div>
            <LargeHeader className="text-balance">One place for all your links</LargeHeader>
          </div>
          <div className="text-lg text-black/80 leading-relaxed font-light flex flex-col items-start gap-0 text-center lg:text-start">
            <span>Gather your email, socials and more in a simple</span>
            <span>engaging link-in-bio page. Claim your page today and</span>
            <span>make your bio outstanding.</span>
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
        <div className="flex flex-col justify-center items-center py-6 relative lg:static">
          <PhoneContainer className="md:max-w-[18rem] bg-white z-10">
            <div className="flex flex-row items-stretch p-4 bg-white">
              {images.map((image, index) => (
                <img
                  key={image}
                  alt="ShutterBugs"
                  src={image}
                  className={twMerge(
                    'animate-appearFromRight hidden',
                    currentImage === index && 'block',
                  )}
                />
              ))}
            </div>
          </PhoneContainer>
          <div className="hidden lg:flex absolute w-1/2 h-full right-0 border border-l-stone-600 bg-purple-200">
          </div>
          <div className="lg:hidden flex absolute w-screen h-full -left-full bg-purple-200">
          </div>
        </div>
      </div>
      <IndexMarquee />
      <div className="grid md:grid-cols-2 grid-cols-1">
        <div className={twMerge('flex flex-col justify-center items-center px-16')}>
          <div className="flex flex-col items-start gap-6">
            <Ornament />
            <LargeHeader className="text-balance">Why choose Directly Bio?</LargeHeader>
          </div>
        </div>
        {/* <div className="flex flex-col justify-center items-center w-full px-4 md:w-2/3">
        </div> */}
        <div className="grid grid-cols-2 bg-stone-600 p-[1px] md:pt-0 gap-[1px]">
          <AttributeBox className="bg-sky-200" title="Customizable" desc="Several options to design your page and make it suit your particular brand" Graphic={<IconSettingsCheck size={48} />} />
          <AttributeBox className="bg-yellow-200" title="Powerful" desc="Lots of block layouts to choose from and greater options for how to organize your content" Graphic={<IconGridDots size={48} />} />
          <AttributeBox className="bg-orange-200" title="Affordable" desc="More affordable than most link-in-bio platforms" Graphic={<IconCoinFilled size={48} />} />
          <AttributeBox className="bg-red-200" title="Multiple Profiles" desc="Manage multiple profiles easily with the Pro plan" Graphic={<IconBoxMultiple size={48} />} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 bg-stone-600 p-[1px] gap-[1px]">
        <div className="flex flex-col justify-center items-center bg-purple-300" />
        <div className={twMerge('flex flex-col justify-center items-center px-16 py-16 bg-white')}>
          <div className="flex flex-col items-start gap-6 py-6">
            <Ornament />
            <LargeHeader className="text-balance">Share your page from your Instagram, TikTok, Twitter and other bios</LargeHeader>
            <span className="text-stone-600 leading-snug font-light">
              Add your unique URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic online.
            </span>
            <PrimaryButtonLink to={AppLinks.Plans} className="rounded-full px-6 py-4">
              More features
            </PrimaryButtonLink>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 bg-stone-600 p-[1px] gap-[1px]">
        <div className={twMerge('flex flex-col justify-center items-center px-16 py-16 bg-white')}>
          <div className="flex flex-col items-start gap-6 py-6">
            <Ornament />
            <LargeHeader className="text-balance">Gather blocks into folders</LargeHeader>
            <span className="text-stone-600 leading-snug font-light text-balance text-lg">
              Use folders to group related blocks and make your page feel organized and intuitive.
            </span>
            <PrimaryButtonLink to={AppLinks.Plans} className="rounded-full px-6 py-4">
              More features
            </PrimaryButtonLink>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center bg-yellow-300" />
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 border-b border-stone-600 py-12">
        <div className="flex flex-col items-start justify-center gap-4 px-16 py-16 md:col-span-2">
          <Ornament />
          <LargeHeader className="text-balance">Who uses Directly Bio?</LargeHeader>
          <span className="text-balance leading-relaxed font-light">From artists, creators to small business owners and more use Directly Bio to establish their online presence.</span>
          <PrimaryButtonLink to={AppLinks.Signup}>
            Get Started
          </PrimaryButtonLink>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-6 md:col-span-3 py-16">
          {[1, 2, 3].map(num => (
            <div key={num} className="bg-black/10 rounded-xl aspect-auto w-full min-h-[400px] -skew-x-3 skew-y-3">
            </div>
          ))}
        </div>
      </div>
      <IndexMarquee />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-purple-300">
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

