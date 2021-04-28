// global styles shared across the entire site
import 'styles/global.css'

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
import 'katex/dist/katex.min.css'

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

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { bootstrap } from 'lib/bootstrap-client'
import Head from 'next/head'

if (typeof window !== 'undefined') {
  bootstrap()
}

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [showScript, setShowScript] = useState(false)
  const [showVitalsScript, setShowVitalsScript] = useState(false)

  useEffect(() => {
    console.log(
      router?.asPath?.includes('vercel') || router?.asPath?.includes('next')
    )
    if (
      (router?.asPath?.includes('vercel') ||
        router?.asPath?.includes('next')) &&
      !(router?.asPath?.includes('vital') || router?.asPath?.includes('cwv'))
    ) {
      setShowScript(true)
    } else if (
      router?.asPath?.includes('vital') ||
      router?.asPath?.includes('cwv')
    ) {
      setShowVitalsScript(true)
    }
  }, [router.asPath])

  return (
    <>
      <Head>
        {showScript && (
          <script
            async
            data-uid='95addec264'
            src='https://drewdottech.ck.page/95addec264/index.js'
          ></script>
        )}
        {showVitalsScript && (
          <script
            async
            data-uid='a07fa50907'
            src='https://drewdottech.ck.page/a07fa50907/index.js'
          ></script>
        )}
      </Head>
      <Component {...pageProps} />
    </>
  )
}
