import type { ComponentProps } from 'react';

import { Link } from '@remix-run/react';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconBrandYoutube,
  IconMail,
} from '@tabler/icons-react';
import { twMerge } from 'tailwind-merge';

import { EmailAddressCapture } from './EmailAddressCapture';
import { LogoLinkWithText } from './Logo';
import { SocMediaBadge } from './SocMediaBadge';

export function Footer() {
  return (
    <div className="flex flex-col items-stretch px-16 py-16 pb-12 md:pb-32 bg-stone-900">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-4">
        <div className="flex flex-col items-start gap-8">
          <LogoLinkWithText darkMode={true} />
          <div className="flex flex-col items-start gap-4">
            <span className="text-white/60 text-sm font-light">
              Building your online presence since 2024.
            </span>
            <span className="text-white/60 text-sm font-light">
              Built with ❤️ with RemixJS
            </span>
          </div>
        </div>
        <div className="grow" />
        <div className="flex flex-col items-start gap-4">
          <Title>Resources</Title>
          <CustomLink to={'/'}>Help Center</CustomLink>
          <CustomLink to={'/'}>Contact Us</CustomLink>
          <CustomLink to={'/'}>Sign Up</CustomLink>
          <CustomLink to={'/'}>Log In</CustomLink>
          <CustomLink to={'/'}>Terms of Service</CustomLink>
          <CustomLink to={'/'}>Cookie Policy</CustomLink>
          <CustomLink to={'/'}>Privacy Policy</CustomLink>
        </div>
        <div className="grow" />
        <div className="flex flex-col items-stretch gap-4 md:gap-6">
          <Title>Stay up to date</Title>
          <EmailAddressCapture />
          <div className="flex flex-row items-center gap-2 pb-6">
            <SocButton href="mailto:allansimoyi@gmail.com">
              <SocMediaBadge>
                <IconMail className="text-black" />
              </SocMediaBadge>
            </SocButton>
            <SocButton href="instagram.com/simoyiallan">
              <SocMediaBadge>
                <IconBrandInstagram className="text-purple-600" />
              </SocMediaBadge>
            </SocButton>
            <SocButton href="x.com/simoyi_allan">
              <SocMediaBadge>
                <IconBrandX className="text-sky-400" />
              </SocMediaBadge>
            </SocButton>
            <SocButton href="youtube.com/channel/UCtpkhivq4wu5Axonq-XVpsA">
              <SocMediaBadge>
                <IconBrandYoutube className="text-red-600" />
              </SocMediaBadge>
            </SocButton>
            <SocButton href="facebook.com/allan.simoyi">
              <SocMediaBadge>
                <IconBrandFacebook className="text-sky-600" />
              </SocMediaBadge>
            </SocButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocButton(props: ComponentProps<'a'>) {
  const { href, className, children, ...rest } = props;
  return (
    <a
      href={href}
      className={twMerge(
        'hover:scale-105 transition-all duration-150',
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}

function Title({ children, className, ...rest }: ComponentProps<'span'>) {
  return (
    <span
      className={twMerge(
        'text-white text-xl font-bold mb-2 md:mb-4',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

function CustomLink(props: ComponentProps<typeof Link>) {
  const { className, children, to, ...rest } = props;
  return (
    <Link
      to={to}
      className={twMerge(
        'text-white/60 hover:text-white transition-all duration-150 text-sm',
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
