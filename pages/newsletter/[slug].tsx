import { isDev, domain } from 'lib/config'
import { resolveRevueIssue } from 'lib/resolve-revue-issue'
import { getRevueIssues } from 'lib/get-revue-issues'
import { Tweet, TwitterContextProvider } from 'react-static-tweets'
import parse, { HTMLReactParserOptions } from 'html-react-parser'
import { Element } from 'domhandler/lib/node'

export const getStaticProps = async (context) => {
  const slug = context.params.slug as string

  try {
    const props = await resolveRevueIssue(domain, slug)

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, slug, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export async function getStaticPaths() {
  const issues = await getRevueIssues()

  const ret = {
    paths: issues,
    fallback: true
  }

  return ret
}

export default function RenderShit(props) {
  // parse with regular expression
  // render as react component to html
  // put it back in the doc

  // tweet
  // embed

  const options: HTMLReactParserOptions = {
    replace: (domNode: Element) => {
      if (domNode.attribs && domNode.attribs.tweetid) {
        return <Tweet id={domNode.attribs.tweetid} />
      }
    }
  }
  if (!props.html) return null
  return (
    <TwitterContextProvider
      value={{
        tweetAstMap: props.tweetAstMap,
        swrOptions: {
          fetcher: (id) =>
            fetch(`/api/get-tweet-ast/${id}`).then((r) => r.json())
        }
      }}
    >
      <div className='prose prose-lg lg:prose-xl max-w-3xl lg:m-auto mx-4 py-12'>
        <h1>{props.title}</h1>
        <div>{parse(props.html, options)}</div>
        <hr />
        <script
          async
          data-uid='e5c5089877'
          src='https://drewdottech.ck.page/e5c5089877/index.js'
        ></script>
      </div>
    </TwitterContextProvider>
  )
}
