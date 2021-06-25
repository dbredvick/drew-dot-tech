// global styles shared across the entire site
/* purgecss start ignore */
import 'styles/global.css'
/* purgecss end ignore */
import 'tailwindcss/tailwind.css'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'

// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'

// used for collection views selector (optional)
// TODO: re-add if we enable collection view dropdowns
// import 'rc-dropdown/assets/index.css'

// used for rendering equations (optional)
// import 'katex/dist/katex.min.css'

// core styles for static tweet renderer (optional)
import 'react-static-tweets/styles.css'

// global style overrides for notion
import 'styles/notion.css'

// global style overrides for prism theme (optional)
import 'styles/prism-theme.css'

// here we're bringing in any languages we want to support for
// syntax highlighting via Notion's Code block
import 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'

import { bootstrap } from 'lib/bootstrap-client'

import Head from 'next/head'
import { useRouter } from 'next/router'

if (typeof window !== 'undefined') {
  bootstrap()
}

export default function App({ Component, pageProps }) {
  const router = useRouter()
  return (
    <>
      <Head>
        <div
          dangerouslySetInnerHTML={{
            __html: `
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1017890,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`
          }}
        />
        <meta
          property='og:image'
          content={`https://drew.tech/api/thumbnail?path=${router.asPath}`}
        />
        <meta
          property='twitter:image'
          content={`https://drew.tech/api/thumbnail?path=${router.asPath}`}
        />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
