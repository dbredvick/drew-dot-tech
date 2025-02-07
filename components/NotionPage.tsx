import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import cs from 'classnames'
import { useRouter } from 'next/router'
import { useSearchParam } from 'react-use'
import BodyClassName from 'react-body-classname'

import { Tweet, TwitterContextProvider } from 'react-static-tweets'

// core notion renderer
import { NotionRenderer } from 'react-notion-x'

// utils
import { getBlockTitle } from 'notion-utils'
import { mapPageUrl, getCanonicalPageUrl } from 'lib/map-page-url'
import { mapNotionImageUrl } from 'lib/map-image-url'
import { getPageDescription } from 'lib/get-page-description'
import { getPageTweet } from 'lib/get-page-tweet'
import { searchNotion } from 'lib/search-notion'
import * as types from 'lib/types'
import * as config from 'lib/config'

// components
import { CustomFont } from './CustomFont'
import { Loading } from './Loading'
import { PageHead } from './PageHead'
import { PageActions } from './PageActions'
import { Footer } from './Footer'
import { PageSocial } from './PageSocial'
import Hero from './Hero'

import styles from './styles.module.css'

const Pdf = dynamic(() => import('react-notion-x').then((notion) => notion.Pdf))

const Modal = dynamic(
  () => import('react-notion-x').then((notion) => notion.Modal),
  { ssr: false }
)
const Code = dynamic(
  () => import('react-notion-x').then((notion) => notion.Code),
  { ssr: false }
)
const Collection = dynamic(
  () => import('react-notion-x').then((notion) => notion.Collection),
  { ssr: false }
)
const CollectionRow = dynamic(
  () => import('react-notion-x').then((notion) => notion.CollectionRow),
  { ssr: false }
)
const Page404 = dynamic(
  () => import('../components/Page404').then((imported) => imported.Page404),
  { ssr: false }
)

export const NotionPage: React.FC<types.PageProps> = ({
  site,
  recordMap,
  error,
  pageId,
  newsletter
}) => {
  const Equation = Hero.bind({ newsletter })

  const router = useRouter()
  const lite = useSearchParam('lite')

  const params: any = {}
  if (lite) params.lite = lite

  // lite mode is for oembed
  const isLiteMode = lite === 'true'
  const searchParams = new URLSearchParams(params)

  if (router.isFallback) {
    return <Loading />
  }

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value

  if (error || !site || !keys.length || !block) {
    return <Page404 site={site} pageId={pageId} error={error} />
  }

  const title = getBlockTitle(block, recordMap) || site.name

  if (!config.isServer) {
    // add important objects to the window global for easy debugging
    const g = window as any
    g.pageId = pageId
    g.recordMap = recordMap
    g.block = block
  }

  const siteMapPageUrl = mapPageUrl(site, recordMap, searchParams)

  const canonicalPageUrl =
    !config.isDev && getCanonicalPageUrl(site, recordMap)(pageId)

  // const isRootPage =
  //   parsePageId(block.id) === parsePageId(site.rootNotionPageId)
  const isBlogPost =
    block.type === 'page' && block.parent_table === 'collection'
  const minTableOfContentsItems = 3

  // const socialImage = mapNotionImageUrl(
  //   (block as PageBlock).format?.page_cover || config.defaultPageCover,
  //   block
  // )

  const socialDescription =
    getPageDescription(block, recordMap) ?? config.description

  let comments: React.ReactNode = null
  let pageAside: React.ReactChild = null

  // only display comments and page actions on blog post pages
  if (isBlogPost) {
    if (config.utterancesGitHubRepo) {
      const ReactUtterances = dynamic(() =>
        import('./ReactUtterances').then((imported) => imported.ReactUtterances)
      )
      comments = (
        <ReactUtterances
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          repo={config.utterancesGitHubRepo}
          issueMap='issue-term'
          issueTerm='title'
          theme={'github-light'}
        />
      )
    }

    const tweet = getPageTweet(block, recordMap)
    if (tweet) {
      pageAside = <PageActions tweet={tweet} />
    }
  } else {
    pageAside = <PageSocial />
  }

  return (
    <TwitterContextProvider
      value={{
        tweetAstMap: (recordMap as any).tweetAstMap || {},
        swrOptions: {
          fetcher: (id) =>
            fetch(`/api/get-tweet-ast/${id}`).then((r) => r.json())
        }
      }}
    >
      <PageHead site={site} />

      <Head>
        <meta property='og:title' content={title} />
        <meta property='og:site_name' content={site.name} />

        <meta name='twitter:title' content={title} />
        <meta property='twitter:domain' content={site.domain} />

        {config.twitter && (
          <meta name='twitter:creator' content={`@${config.twitter}`} />
        )}

        {socialDescription && (
          <>
            <meta name='description' content={socialDescription} />
            <meta property='og:description' content={socialDescription} />
            <meta name='twitter:description' content={socialDescription} />
          </>
        )}

        {canonicalPageUrl && (
          <>
            <link rel='canonical' href={canonicalPageUrl} />
            <meta property='og:url' content={canonicalPageUrl} />
            <meta property='twitter:url' content={canonicalPageUrl} />
          </>
        )}

        <title>{title}</title>
      </Head>

      <CustomFont site={site} />

      {isLiteMode && <BodyClassName className='notion-lite' />}

      <NotionRenderer
        bodyClassName={cs(
          styles.notion,
          pageId === site.rootNotionPageId && 'index-page'
        )}
        components={{
          pageLink: ({
            href,
            as,
            passHref,
            prefetch,
            replace,
            scroll,
            shallow,
            locale,
            ...props
          }) => (
            <Link
              href={href}
              as={as}
              passHref={passHref}
              prefetch={prefetch}
              replace={replace}
              scroll={scroll}
              shallow={shallow}
              locale={locale}
            >
              <a {...props} />
            </Link>
          ),
          code: Code,
          collection: Collection,
          collectionRow: CollectionRow,
          tweet: Tweet,
          modal: Modal,
          pdf: Pdf,
          equation: Equation
        }}
        recordMap={recordMap}
        rootPageId={site.rootNotionPageId}
        fullPage={!isLiteMode}
        darkMode={false}
        previewImages={site.previewImages !== false}
        showCollectionViewDropdown={false}
        showTableOfContents={!!isBlogPost}
        minTableOfContentsItems={minTableOfContentsItems}
        defaultPageIcon={config.defaultPageIcon}
        defaultPageCover={config.defaultPageCover}
        defaultPageCoverPosition={config.defaultPageCoverPosition}
        mapPageUrl={siteMapPageUrl}
        mapImageUrl={mapNotionImageUrl}
        searchNotion={searchNotion}
        pageFooter={comments}
        pageAside={pageAside}
        footer={<Footer />}
      />
    </TwitterContextProvider>
  )
}
