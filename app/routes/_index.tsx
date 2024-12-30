import type { ActionFunctionArgs } from '@remix-run/node';

import { json, redirect, useFetcher, useLoaderData } from '@remix-run/react';
import {
  IconBolt,
  IconBoxMultiple,
  IconBrandSpotifyFilled,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutubeFilled,
  IconBuildingStore,
  IconCoinFilled,
  IconMailCheck,
  IconSettingsCheck,
} from '@tabler/icons-react';
import { useEffect, type ComponentProps, type ReactNode } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import BannerDark from '~/../public/images/banner_dark.png';
import BannerLightDark from '~/../public/images/banner_light_dark.png';
import NoCodingImage from '~/../public/images/no_coding_required.png';
import PersonLite from '~/../public/images/person_lite.png';
import PickThemeImage from '~/../public/images/pick_theme.png';
import WorldSvg from '~/../public/images/world.svg';
import {
  ActionContextProvider,
  useForm,
} from '~/components/ActionContextProvider';
import { AttributeBox } from '~/components/AttributeBox';
// import { Banner } from '~/components/Banner';
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
import { getRawFormFields, hasFormError } from '~/models/forms';
import { AppLinks } from '~/models/links';
import { useOptionalUser } from '~/utils';

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

    const numDuplicates = await prisma.user.count({
      where: { accountName: newPageName },
    });
    if (numDuplicates) {
      return badRequest({
        fields: { newPageName },
        fieldErrors: { newPageName: ['Page name already taken'] },
      });
    }

    return redirect(`${AppLinks.Join}?pageName=${newPageName}`);
  } catch (error) {
    return badRequest({ formError: getErrorMessage(error) });
  }
}

export default function Index() {
  const currentUser = useOptionalUser();
  const { url } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();

  const { getNameProp, isProcessing } = useForm(fetcher, Schema);

  useEffect(() => {
    if (hasFormError(fetcher.data)) {
      toast.error(fetcher.data.formError);
    }
  }, [fetcher.data]);

  return (
    <div className="flex flex-col items-stretch px-4 lg:px-0 bg-[#282934] text-white">
      <Toolbar
        isOnIndexPage
        className="bg-[#282934]"
        isLoggedIn={!!currentUser}
      />
      <div
        className={twMerge(
          'bg-[#282934] flex-col items-stretch relative border-b border-stone-600 text-white',
          'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-2 py-0 pb-6',
        )}
      >
        <div className="gap-8 flex flex-col justify-center items-stretch py-6 px-4 md:px-16">
          <div className="flex flex-col items-start">
            <SocialMediaTiles />
            <LargeHeader className="text-balance">
              Simple link-in-bio tool for creators
            </LargeHeader>
          </div>
          <div className="text-lg text-white/60 leading-relaxed font-light flex flex-col items-start gap-0 text-start">
            <span>
              Gather all of your products, services and courses on a
              simple,&nbsp;
            </span>
            <span>
              engaging page accessible directly from your link-in-bio.
            </span>
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
        {/* <Banner className="hidden lg:flex" /> */}
        <div className="flex flex-col justify-start items-center">
          <img
            src={BannerDark}
            alt="Banner"
            className="w-[26rem] object-contain"
          />
        </div>
      </div>
      <IndexMarquee />
      <div className="grid lg:grid-cols-5 grid-cols-1 px-2">
        <div className="flex flex-col justify-center items-center px-4 md:px-16 lg:col-span-2">
          <div className="flex flex-col items-start gap-6 py-16">
            <Ornament />
            <LargeHeader className="text-balance">
              Why choose Directly Bio?
            </LargeHeader>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 p-4 md:p-16 gap-8 lg:col-span-3">
          <AttributeBox
            className="bg-sky-300"
            title="Customizable"
            desc="Several options to design your page and make it suit your particular brand"
            Graphic={<IconSettingsCheck size={48} />}
          />
          <AttributeBox
            className="bg-yellow-300"
            title="Powerful"
            desc="Lots of block layouts to choose from and greater options for how to organize your content"
            Graphic={<IconBolt size={48} />}
          />
          <AttributeBox
            className="bg-orange-300"
            title="Affordable"
            desc="More affordable than most link-in-bio platforms"
            Graphic={<IconCoinFilled size={48} />}
          />
          <AttributeBox
            className="bg-red-300"
            title="Multiple Profiles"
            desc="Manage multiple profiles easily with the Pro plan"
            Graphic={<IconBoxMultiple size={48} />}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 bg-white/10 p-[1px] gap-[1px]">
        <div className="flex flex-col justify-center items-center px-16 py-16">
          <div className="flex flex-col items-start gap-6 py-6">
            <Ornament />
            <LargeHeader className="text-balance">
              Pick a theme or design your own
            </LargeHeader>
            <span className="text-white/60 leading-loose font-light">
              Save time by choosing among our preset themes.
              <br />
              We`ve made sure out themes look great.
            </span>
            <PrimaryButtonLink
              to={AppLinks.Plans}
              className="rounded-full px-6 py-4"
            >
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
      <div className="grid lg:grid-cols-2 grid-cols-1 bg-white/10 p-[1px] gap-[1px]">
        <div
          className={twMerge(
            'flex flex-col justify-center items-center px-16 py-16',
          )}
        >
          <div className="flex flex-col items-start gap-6 py-6">
            <Ornament className="bg-yellow-400" />
            <LargeHeader className="text-balance">
              No coding required
            </LargeHeader>
            <span className="text-white/60 leading-loose font-light text-balance text-lg">
              Use blocks to design and customize your content. Group related
              blocks into folders to organize them. Everything is quick to load
              and SEO optimised.
            </span>
            <PrimaryButtonLink
              to={AppLinks.Plans}
              className="rounded-full px-6 py-4"
            >
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
      <div className="flex flex-col justify-center items-center py-16 px-16 gap-16">
        <div className="flex flex-col justify-center items-center gap-6 pt-6">
          <Ornament className="bg-purple-600" />
          <LargeHeader>Additional Features</LargeHeader>
        </div>
        <div className="rounded-lg w-full md:w-4/5 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomCard
            title="Analyze your audience, keep track of everything"
            Graphic={
              <div className="flex flex-col items-stretch gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid grid-cols-2 col-span-2 bg-white/10 rounded-[2rem]">
                    <div className="flex flex-col justify-center items-center overflow-hidden w-full aspect-square p-6">
                      <img
                        src={WorldSvg}
                        className="object-contain"
                        alt="Location Tracking"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center py-6 pr-6">
                      <span className="text-white/60 text-xs">
                        California, USA
                      </span>
                      <div className="grow" />
                      <span className="font-semibold text-white text-3xl">
                        8.6k
                      </span>
                      <div className="grow" />
                      <span className="text-white/60 text-xs">Views</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center py-4 px-6 gap-2 bg-white/10 rounded-[2rem]">
                    <IconBuildingStore className="text-green-400" size={36} />
                    <span className="text-xl font-semibold">143</span>
                    <span className="text-white/60 text-xs">Clicks</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col justify-center items-center py-4 px-6 gap-2 bg-white/10 rounded-[2rem]">
                    <IconMailCheck className="text-green-400" size={36} />
                    <span className="text-xl font-semibold">783</span>
                    <span className="text-white/60 text-xs">Emails</span>
                  </div>
                  <div className="grid grid-cols-2 col-span-2 bg-white/10 rounded-[2rem]">
                    <div className="flex flex-row justify-center items-end overflow-hidden w-full p-6 pr-4 gap-[0.4rem]">
                      <Bar className="h-6 bg-blue-400" />
                      <Bar className="h-12" />
                      <Bar className="h-10 bg-blue-400" />
                      <Bar className="h-16" />
                      <Bar className="h-14 bg-blue-400" />
                      <Bar className="h-20" />
                    </div>
                    <div className="flex flex-col justify-center items-center py-6 pr-6">
                      <div className="grow" />
                      <span className="font-semibold text-white text-3xl">
                        8.6k
                      </span>
                      <div className="grow" />
                      <span className="text-white/60 text-xs text-center leading-relaxed">
                        New <br /> Subscribers
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <CustomCard
            title="Embed your favorite apps and content"
            Graphic={
              <div className="flex flex-col justify-start items-start h-full relative">
                <EmbedCard
                  Icon={<IconBrandYoutubeFilled className="text-white" />}
                  className="bg-gradient-to-br from-red-600 to-red-400 absolute bottom-0 left-[20%] z-50"
                />
                <EmbedCard
                  Icon={<IconBrandTiktok className="text-white" />}
                  className="bg-gradient-to-br from-black to-stone-600 absolute bottom-0 left-[20%] translate-x-10 -translate-y-10 z-40"
                />
                <EmbedCard
                  Icon={<IconBrandSpotifyFilled className="text-white" />}
                  className="bg-gradient-to-br from-teal-800 to-teal-400 absolute bottom-0 left-[20%] translate-x-20 -translate-y-20 z-30"
                />
                <EmbedCard
                  Icon={<IconBrandX className="text-white" />}
                  className="bg-gradient-to-br from-black to-stone-600 absolute bottom-0 left-[20%] translate-x-[7.5rem] -translate-y-[7.5rem] z-20"
                />
              </div>
            }
          />
        </div>
      </div>
      {/* <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 border-b border-stone-600 py-12 bg-white/10">
        <div className="flex flex-col items-start justify-center gap-4 px-16 py-16 lg:col-span-2">
          <Ornament />
          <LargeHeader className="text-balance">
            Who uses Directly Bio?
          </LargeHeader>
          <span className="text-balance leading-relaxed font-light">
            From artists, creators to small business owners and more use
            Directly Bio to establish their online presence.
          </span>
          <PrimaryButtonLink to={AppLinks.Signup}>
            Get Started
          </PrimaryButtonLink>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-6 lg:col-span-3 py-16">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="bg-black/10 rounded-xl aspect-auto w-full min-h-[400px] -skew-x-3 skew-y-3"
            ></div>
          ))}
        </div>
      </div> */}
      <IndexMarquee />
      <div
        id="signup"
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/10 px-4 md:px-16"
      >
        <div className="flex flex-col justify-start items-stretch px-4 pt-16 md:p-12">
          <img src={BannerLightDark} alt="Banner" />
        </div>
        <div className="flex flex-col items-stretch justify-start md:justify-center pb-16 md:py-16 gap-4 md:gap-12">
          <div className="flex flex-col justify-start md:justify-center items-center">
            <LargeHeader>Try Directly Bio!</LargeHeader>
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
      </div>
      <Footer />
    </div>
  );
}

interface CustomCardProps extends ComponentProps<'div'> {
  title: string;
  Graphic: ReactNode;
}
function CustomCard(props: CustomCardProps) {
  const { className, title, Graphic, ...rest } = props;
  return (
    <div
      className={twMerge(
        'bg-white/10 flex flex-col items-stretch p-12 gap-8 rounded-[4rem] shadow-md',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col justify-center items-stretch overflow-hidden grow">
        {Graphic}
      </div>
      <div className="flex flex-col justify-center items-center">
        <span className="text-2xl font-semibold text-center leading-loose text-balance">
          {title}
        </span>
      </div>
    </div>
  );
}

interface BarProps extends ComponentProps<'div'> {}
function Bar(props: BarProps) {
  const { className, ...rest } = props;
  return (
    <div
      className={twMerge('rounded-full bg-blue-500 w-3', className)}
      {...rest}
    />
  );
}

interface EmbedCardProps extends ComponentProps<'div'> {
  Icon: ReactNode;
}
function EmbedCard(props: EmbedCardProps) {
  const { className, Icon, ...rest } = props;
  return (
    <div
      className={twMerge(
        'rounded-3xl p-4 bg-white/10 relative flex flex-col items-stretch w-36 aspect-square',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          src={PersonLite}
          alt="Person Avator"
          className="rounded-full w-8 aspect-square object-contain"
        />
        <div className="flex flex-col items-start gap-2">
          <SkeletonBar className="w-9" />
          <SkeletonBar className="w-6" />
        </div>
      </div>
      <div className="absolute top-4 right-4">{Icon}</div>
    </div>
  );
}

interface SkeletonBarProps extends ComponentProps<'div'> {}
function SkeletonBar(props: SkeletonBarProps) {
  const { className, ...rest } = props;
  return (
    <div
      className={twMerge('h-2 rounded-full w-6 bg-white/10', className)}
      {...rest}
    />
  );
}
