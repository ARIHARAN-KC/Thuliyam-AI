import "@/pages/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Thuliyam AI</title>
        <link rel="icon" href="/logo.svg" />
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />

        {/* Google Analytics / GA4 */}
        {GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </Head>

      <Component {...pageProps} />
    </>
  );
}
