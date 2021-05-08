import { fetchTweetAst } from 'static-tweets'
import pMap from 'p-map'
import ReactDOMServer from 'react-dom/server'
import React from 'react'
import { Tweet } from 'react-static-tweets'

export async function resolveRevueIssue(domain: string, slug?: string) {
  const baseUrl = 'https://www.getrevue.co/api'

  const res = await fetch(`${baseUrl}/v2/issues`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.REVUE_API}` }
  })
  const data = await res.json()
  const issues = data.map((x) => ({
    ...x,
    url: x.url.replace('https://www.getrevue.co/profile/dbredvick/issues/', '')
  }))
  const result = issues.filter((x) => x.url === slug)[0]

  const embedRegex = /\[embed https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)\]/g
  const tweetRegex = /\[tweet https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)\]/g

  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  const embeds = result.html.matchAll(embedRegex)
  const tweets = result.html.matchAll(tweetRegex)

  const tweetData = [...tweets]
  const tweetIds = tweetData.map((tweet) => {
    return tweet[2].split('/')[3]
  })
  const tweetAsts = await pMap(
    tweetIds,
    async (tweetId) => {
      try {
        return {
          tweetId,
          tweetAst: await fetchTweetAst(tweetId)
        }
      } catch (err) {
        console.error('error fetching tweet info', tweetId, err)
      }
    },
    {
      concurrency: 4
    }
  )

  const tweetAstMap = tweetAsts.reduce((acc, { tweetId, tweetAst }) => {
    if (tweetAst) {
      return {
        ...acc,
        [tweetId]: tweetAst
      }
    } else {
      return acc
    }
  }, {})

  result.tweetAstMap = tweetAstMap

  tweetData.map((currentTweet, index) => {
    const id = currentTweet[2].split('/')[3]
    console.log('map', tweetAstMap[id][0])
    const html = ReactDOMServer.renderToStaticMarkup(
      React.createElement(
        'tweet',
        {
          tweetid: tweetAstMap[id][0].data.id
        },
        'hello'
      )
    )
    console.log('rendered:', html)
    result.html = result.html.replace(currentTweet[0], html)
  })

  // render tweets to html
  // insert them where they go https://stackoverflow.com/questions/29586411/react-js-is-it-possible-to-convert-a-react-component-to-html-doms

  const embedFinds = [...embeds]
  embedFinds.map((embed) => {
    const url = embed[0].match(urlRegex)
    const iframeHtml = `<iframe src="https://player.vimeo.com/video${
      [...url][2]
    }" style='width: 100%;' frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
    result.html = result.html.replace(embed[0], iframeHtml)
  })
  return result
}
