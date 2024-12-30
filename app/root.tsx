import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';

import { Cloudinary } from '@cloudinary/url-gen/index';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { useMemo } from 'react';
import { Toaster } from 'sonner';

import { RouteErrorBoundary } from './components/Boundaries';
import { CloudinaryContextProvider } from './components/CloudinaryContextProvider';
import { Env } from './models/environment.server';
import { getUser } from './session.server';
import './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;500;600;700;900&display=swap',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700&display=swap',
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: 'Directly Bio - Sell From Your Bio' },
    { name: 'description', content: 'Sell From Your Bio!' },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);

  const CLOUD_NAME = Env.CLOUDINARY_CLOUD_NAME;
  const UPLOAD_RESET = Env.CLOUDINARY_UPLOAD_RESET;

  return { user, CLOUD_NAME, UPLOAD_RESET };
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        className="h-full"
        style={{ fontFamily: '"Noto Sans", sans-serif !important' }}
      >
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { CLOUD_NAME, UPLOAD_RESET } = useLoaderData<typeof loader>();

  const CloudinaryUtil = useMemo(() => {
    return new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });
  }, [CLOUD_NAME]);

  return (
    <CloudinaryContextProvider
      CLOUDINARY_CLOUD_NAME={CLOUD_NAME}
      CLOUDINARY_UPLOAD_RESET={UPLOAD_RESET}
      CloudinaryUtil={CloudinaryUtil}
    >
      <Outlet />
      <Toaster />
    </CloudinaryContextProvider>
  );
}

export function ErrorBoundary() {
  return <RouteErrorBoundary />;
}
