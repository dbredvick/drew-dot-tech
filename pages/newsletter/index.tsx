import { useState } from 'react'

import { getRevueIssuesData } from 'lib/get-revue-issues'
export const getStaticProps = async () => {
  try {
    const items = await getRevueIssuesData()
    return { props: { items }, revalidate: 10 }
  } catch (err) {
    console.error('page error', err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export default function ListPage(props) {
  const [email, setEmail] = useState('')
  const posts = props.items

  const isEmailValid = (possibleEmail) => {
    const emailPattern = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/
    return emailPattern.test(possibleEmail)
  }

  const submitEmail = async (e) => {
    e.preventDefault()
    if (isEmailValid(email)) {
      await fetch(`/api/submit-revue-email?email=${encodeURIComponent(email)}`)
      setEmail('')
    } else {
      window.alert('Invalid email format')
    }
  }

  return (
    <div className='bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
      <div className='relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl'>
        <div>
          <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
            Weekly Newsletter
          </h2>
          <div className='mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center'>
            <p className='text-xl text-gray-500'>
              Get weekly articles in your inbox on how to grow your business.
            </p>
            <form className='mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email-address'
                  type='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='appearance-none w-full px-4 py-2 border border-gray-300 text-base rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 lg:max-w-xs'
                  placeholder='Enter your email'
                />
              </div>
              <div className='mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex'>
                <button
                  type='button'
                  onClick={submitEmail}
                  className='w-full bg-green-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:inline-flex'
                >
                  Notify me
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12'>
          {posts.map((post) => (
            <div key={post.title}>
              <p className='text-sm text-gray-500'>
                <time dateTime={post.datetime}>{post.date}</time>
              </p>
              <a href={post.url} className='mt-2 block'>
                <p className='text-xl font-semibold text-gray-900'>
                  {post.title}
                </p>
                <div
                  className='mt-3 text-base text-gray-500'
                  dangerouslySetInnerHTML={{ __html: post.description }}
                />
              </a>
              <div className='mt-3'>
                <a
                  href={post.url}
                  className='text-base font-semibold text-green-600 hover:text-green-500'
                >
                  Read full story
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
