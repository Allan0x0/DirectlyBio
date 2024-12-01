import { IconCircleCheck } from '@tabler/icons-react';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { Footer } from '~/components/Footer';
import { LargeHeader } from '~/components/LargeHeader';
import { Ornament } from '~/components/Ornament';
import { Toolbar } from '~/components/Toolbar';
import { useOptionalUser } from '~/utils';

export default function Plans() {
  const currentUser = useOptionalUser();

  const features = [
    "Custom Logo",
    "Link Blocks",
    "Link to URL or Email",
    "Link directly to subpages",
    "Custom DirectlyBio URL",
    "Multi - page navigation",
    "Schedule link publishing",
    "Unlimited blocks and socials",
    "Grid, Carousel and Highlight layouts",
    "Share button with QR code",
    "Customize sharing metadata",
    "Customize fonts, colors, etc...",
    "Draw attention to certain blocks by animating them",
    "Add a custom logo at the bottom of your page",
  ]

  return (
    <div className="flex flex-col items-stretch px-4 md:px-0">
      <Toolbar isLoggedIn={!!currentUser} />
      <div className="flex-col items-stretch px-16 py-16 gap-8">
        <div className="flex flex-col justify-center items-center gap-4">
          <Ornament />
          <LargeHeader>Plans & Pricing</LargeHeader>
          <span className="text-stone-600 font-light text-lg">Subscribe to Premium and give your bio the best features.</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-stretch py-8 w-full md:w-4/5 lg:w-2/3">
            <table className="border-collapse border border-stone-600 rounded-lg shadow-large">
              <thead>
                <tr>
                  <Th>
                    <div className="flex flex-col items-start">
                      <span className="font-black">General</span>
                    </div>
                  </Th>
                  <Th><span className="font-orange-600 font-black">Premium</span></Th>
                </tr>
              </thead>
              <tbody>
                {features.map(feature => (
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

function Th(props: ComponentProps<'th'>) {
  const { className, children, ...rest } = props;
  return (
    <th className={twMerge('border border-stone-600 px-6 py-4', className)} {...rest}>
      {children}
    </th>
  )
}

function Td(props: ComponentProps<'td'>) {
  const { className, children, ...rest } = props;
  return (
    <td className={twMerge('border border-stone-600 px-6 py-4', className)} {...rest}>
      {children}
    </td>
  )
}

// Sync posts from Instagram
// Become a DirectlyBio affiliate
// Request verification badge
// Search bar to find specific content
// Pinterest website verification
// Access Beta Features (eg. AI Chat)
// Connect a Custom Domain to your Profile(s)