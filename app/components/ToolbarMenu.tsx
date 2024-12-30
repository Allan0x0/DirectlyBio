import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link } from '@remix-run/react';
import { IconLogin2, IconMenu2, IconUserPlus } from '@tabler/icons-react';

import { AppLinks } from '~/models/links';

export default function ToolbarMenu() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white">
          <IconMenu2 className="size-4 fill-white/60" />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <Link
              to={AppLinks.Login}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            >
              <IconLogin2 className="size-4 fill-white/30" />
              Log In
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to={AppLinks.Join}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            >
              <IconUserPlus className="size-4 fill-white/30" />
              Sign Up
            </Link>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
