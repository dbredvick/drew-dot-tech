import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import Breadcrumbs from 'components/Breadcrumbs'
import Link from 'next/link';
import Head from 'next/head';

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
  const [show, setShow] = useState(false)
  const posts = props.items

  const isEmailValid = (possibleEmail) => {
    const emailPattern = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/
    return emailPattern.test(possibleEmail)
  }

  const submitEmail = async (e) => {
    e.preventDefault()
    if (isEmailValid(email)) {
      await fetch(`/api/submit-revue-email?email=${encodeURIComponent(email)}`)
      setShow(true)
      setEmail('')
    } else {
      window.alert('Invalid email format')
    }
  }

  return (
    <>
      <Head>
        <title>Drew's Journal</title>
        <meta property="description" content="An email each week about the path to ramen profitability as a solo dev." />
      </Head>
      <div className="pt-6 px-4 md:px-0 md:pt-12  relative max-w-lg mx-auto  lg:max-w-3xl">
        <Breadcrumbs />
      </div>
      <div className='bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
        <div className='relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-3xl'>
          <div>
            <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
              Drew's Journal
            </h2>
            <div className='mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center'>
              <p className='text-xl text-gray-500'>
                An email each week about modern web dev, building and growing SaaS apps, and interesting things I found on the internet.
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
                  <time dateTime={post.sent_at}>
                    {new Date(post.sent_at).toDateString()}
                  </time>
                </p>
                <Link href={post.url} passHref>
                  <a className='mt-2 block'>
                    <p className='text-xl font-semibold text-gray-900'>
                      {post.title}
                    </p>
                    <div
                      className='mt-3 text-base text-gray-500'
                      dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                  </a>
                </Link>
                <div className='mt-3'>
                  <Link href={post.url} passHref>
                    <a

                      className='text-base font-semibold text-green-600 hover:text-green-500'
                    >
                      Read full story
                  </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <>
        {/* Global notification live region, render this permanently at the end of the document */}
        <div
          aria-live='assertive'
          className='fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start'
        >
          <div className='w-full flex flex-col items-center space-y-4 sm:items-end'>
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
              show={show}
              as={Fragment}
              enter='transform ease-out duration-300 transition'
              enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
              enterTo='translate-y-0 opacity-100 sm:translate-x-0'
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden'>
                <div className='p-4'>
                  <div className='flex items-start'>
                    <div className='flex-shrink-0'>
                      <CheckCircleIcon
                        className='h-6 w-6 text-green-400'
                        aria-hidden='true'
                      />
                    </div>
                    <div className='ml-3 w-0 flex-1 pt-0.5'>
                      <p className='text-sm font-medium text-gray-900'>
                        Email submitted!
                      </p>
                      <p className='mt-1 text-sm text-gray-500'>
                        You're on the list and you'll get the next issue.
                      </p>
                    </div>
                    <div className='ml-4 flex-shrink-0 flex'>
                      <button
                        className='bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        onClick={() => {
                          setShow(false)
                        }}
                      >
                        <span className='sr-only'>Close</span>
                        <XIcon className='h-5 w-5' aria-hidden='true' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </>
    </>
  )
}
