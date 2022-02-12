import { ReactNode } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import bikeLogo from '../public/color-bike.svg'

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({
  children,
  title = '2Wheels Calendar',
  description = 'Plan your rides'
}: LayoutProps) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta 
        name="description" 
        content="Two wheels calendar"
      />
      <meta 
        name="keywords" 
        content="calendar"
      />
      <meta property="og:title" content={title} />
      <meta 
        property="og:description"
        content={description}
      />
      <meta property="og:site_name" content="2 wheels events" />
      <meta property="og:url" content="" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="" />
      <meta name="twitter:title" content={title} />
      <meta 
        name="twitter:description" 
        content={description}
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="2 wheels events" />
      <meta name="twitter:image" content="" />
      <meta name="twitter:domain" content="" />
      <link rel="icon" href="/bike.svg" />
    </Head>
    <div className="bg-slate-100 min-h-screen">
      <div className="py-5">
        <header className="mb-5">
          <div className="flex">
            <Image
              src={bikeLogo}
              alt="2Wheels logo"
            />
            <div className="ml-5">
              <h1 className="text-3xl">{title}</h1>
              <p>{description}</p>
            </div>
          </div>
        </header>
        <main className="">{children}</main>
      </div>
    </div>
  </>
);

export default Layout;