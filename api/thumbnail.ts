import * as playwright from 'playwright-aws-lambda'
import { NextApiRequest, NextApiResponse } from 'next'

const getAbsoluteURL = (path) => {
  const baseURL = 'https://drew.tech'
  return baseURL + path
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Start the browser with the AWS Lambda wrapper (playwright-aws-lambda)
  const browser = await playwright.launchChromium()

  async function loadFonts() {
    try {
      await playwright.loadFont(
        'https://rawcdn.githack.com/googlefonts/noto-emoji/41708e907f229968abcdc8ec4c59832e109ff1e8/fonts/NotoColorEmoji.ttf'
      )
      await playwright.loadFont(
        'https://rawcdn.githack.com/googlefonts/noto-fonts/31de21ec51b4b54309bd48b9e4b3693fdfe47bcc/alpha/NotoSansHistoric-Regular.ttf'
      )
      console.log('FontsLoaded')
    } catch (error) {
      console.log(error)
    }
  }
  loadFonts()

  // Create a page with the Open Graph image size best practise
  const page = await browser.newPage({
    viewport: {
      width: 1200,
      height: 630
    }
  })
  // Generate the full URL out of the given path (GET parameter)
  const url = getAbsoluteURL(req.query['path'] || '')
  await page.goto(url, {
    timeout: 15 * 1000
  })
  //   if (url.includes('results')) {
  //     await page.waitForSelector('#loaded')
  //   }
  const data = await page.screenshot({
    type: 'png'
  })
  await browser.close()
  // Set the s-maxage property which caches the images then on the Vercel edge
  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate')
  res.setHeader('Content-Type', 'image/png')
  // write the image to the response with the specified Content-Type
  res.end(data)
}
