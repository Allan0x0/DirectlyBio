import type { ComponentProps } from 'react';

import { IconCircleCheck } from '@tabler/icons-react';
import { twMerge } from 'tailwind-merge';

import { Footer } from '~/components/Footer';
import { LargeHeader } from '~/components/LargeHeader';
import { Ornament } from '~/components/Ornament';
import { PrimaryButtonLink } from '~/components/PrimaryButton';
import { Toolbar } from '~/components/Toolbar';
import { AppLinks } from '~/models/links';
import { useOptionalUser } from '~/utils';

export default function Plans() {
  const currentUser = useOptionalUser();

  const features = [
    'Custom Logo',
    'Link Blocks',
    'Link to URL or Email',
    'Link directly to subpages',
    'Custom DirectlyBio URL',
    'Email list & Newsletter',
    'Multi-page navigation',
    'Schedule link publishing',
    'Unlimited blocks and socials',
    'Grid, Carousel and Highlight layouts',
    'Share button with QR code',
    'Customize sharing metadata',
    'Customize fonts, colors, etc...',
    'Draw attention to certain blocks by animating them',
    'Add a custom logo at the bottom of your page',
  ];

  return (
    <div className="flex flex-col items-stretch px-4 md:px-0 bg-[#282934] text-white">
      <Toolbar isLoggedIn={!!currentUser} />
      <div className="flex-col items-stretch px-16 py-16 gap-8">
        <div className="flex flex-col justify-center items-center gap-4 py-6">
          <Ornament />
          <LargeHeader>Plans & Pricing</LargeHeader>
          <span className="text-white/60 font-light text-lg">
            Subscribe and make your link-in-bio page outstanding
          </span>
        </div>
        <div className="flex flex-col justify-center items-center py-2">
          <PrimaryButtonLink to={AppLinks.Join} className="px-8 py-4">
            Get Started
          </PrimaryButtonLink>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-stretch py-8 w-full md:w-4/5 lg:w-2/3">
            <table className="border-collapse border border-stone-600 rounded-lg shadow-large bg-white/10">
              <tbody>
                {features.map((feature) => (
                  <tr key={feature}>
                    <Td>{feature}</Td>
                    <Td>
                      <div className="flex flex-col justify-center items-center mx-auto">
                        <IconCircleCheck className="text-green-600" />
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Td(props: ComponentProps<'td'>) {
  const { className, children, ...rest } = props;
  return (
    <td
      className={twMerge('border border-stone-600 px-6 py-4', className)}
      {...rest}
    >
      {children}
    </td>
  );
}

// Sync posts from Instagram
// Become a DirectlyBio affiliate
// Request verification badge
// Search bar to find specific content
// Pinterest website verification
// Access Beta Features (eg. AI Chat)
// Connect a Custom Domain to your Profile(s)
