import React from 'react'
import { isDev, domain } from 'lib/config'
import { getSiteMaps } from 'lib/get-site-maps'
import { resolveNotionPage } from 'lib/resolve-notion-page'
import { NotionPage } from 'components'
import { getRevueIssuesData } from 'lib/get-revue-issues'

export const getStaticProps = async (context) => {
  const rawPageId = context.params.pageId as string

  try {
    if (rawPageId === 'sitemap.xml' || rawPageId === 'robots.txt') {
      return {
        redirect: {
          destination: `/api/${rawPageId}`
        }
      }
    }

    const data = await resolveNotionPage(domain, rawPageId)
    const latestNewsletterData = await getRevueIssuesData()
    const props = { ...data, newsletter: latestNewsletterData[0] }

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, rawPageId, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true
    }
  }

  const siteMaps = await getSiteMaps()

  const ret = {
    paths: siteMaps.flatMap((siteMap) =>
      Object.keys(siteMap.canonicalPageMap).map((pageId) => ({
        params: {
          pageId
        }
      }))
    ),
    // paths: [],
    fallback: true
  }

  return ret
}

export default function NotionDomainDynamicPage(props) {
  return <NotionPage {...props} />
}
