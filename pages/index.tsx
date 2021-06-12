import React from 'react'
import { domain } from 'lib/config'
import { resolveNotionPage } from 'lib/resolve-notion-page'
import { NotionPage } from 'components'
import { getRevueIssuesData } from 'lib/get-revue-issues'

export const getStaticProps = async () => {
  try {
    const data = await resolveNotionPage(domain)
    const latestNewsletterData = await getRevueIssuesData()
    const props = { ...data, newsletter: latestNewsletterData[0] }
    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export default function NotionDomainPage(props) {
  return <NotionPage {...props} />
}
