import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { IconContext } from 'react-icons'

export default class MyDocument extends Document {
  render() {
    return (
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Html lang='en'>
          <Head>
            <link rel='shortcut icon' href='/favicon.png' />

            <link
              rel='apple-touch-icon'
              sizes='180x180'
              href='/apple-touch-icon.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='96x96'
              href='/favicon-96x96.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='32x32'
              href='/favicon-32x32.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='16x16'
              href='/favicon-16x16.png'
            />
            <link rel='preconnect' href='https://s3.amazonaws.com' />
            <script
              async
              defer
              data-website-id='b693215d-a58d-41c8-b68b-8fad4d8881e4'
              src='https://data.drew.tech/umami.js'
            ></script>

            <link rel='manifest' href='/manifest.json' />
          </Head>

          <body>
            <script src='noflash.js' />

            <Main />

            <NextScript />
          </body>
        </Html>
      </IconContext.Provider>
    )
  }
}
