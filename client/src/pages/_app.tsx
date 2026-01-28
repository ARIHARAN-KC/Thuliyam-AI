import "@/pages/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Thuliyam AI</title>
        <link rel="icon" href="/logo.svg" />

        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
