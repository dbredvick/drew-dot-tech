// global styles shared across the entire site
/* purgecss start ignore */
import 'styles/global.css'
/* purgecss end ignore */
import 'tailwindcss/tailwind.css'

// core styles shared by all of react-notion-x (required)
/* purgecss start ignore */
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'

// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'

// used for collection views selector (optional)
// TODO: re-add if we enable collection view dropdowns
// import 'rc-dropdown/assets/index.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

// core styles for static tweet renderer (optional)
import 'react-static-tweets/styles.css'

// global style overrides for notion
import 'styles/notion.css'

// global style overrides for prism theme (optional)
import 'styles/prism-theme.css'
/* purgecss end ignore */

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
