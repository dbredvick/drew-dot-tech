/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import localForage from 'localforage'
import { ChevronRightIcon, StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import me from '../public/drew-header.jpg'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Example(props) {
  const newsletter = this.newsletter
  const type = props.math
  const router = useRouter()

  const copy = `I write about the best way to build side projects & startups with Next.js + React.`

  const [email, setEmail] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)
  useEffect(() => {
    const getData = async () => {
      const registered = await localForage.getItem('registered')
      setIsRegistered(!!registered)
    }
    getData()
  }, [])

  useEffect(() => {
    // remove weird role on equation elements hack
    const elements = document.getElementsByClassName('notion-equation')
    try {
      elements[0].removeAttribute('role')
      elements[0].removeAttribute('tabindex')
      elements[1].removeAttribute('role')
      elements[1].removeAttribute('tabindex')
      elements[2].removeAttribute('role')
      elements[2].removeAttribute('tabindex')
    } catch (err) {
      console.log(err)
    }
  }, [])

  const isEmailValid = (possibleEmail) => {
    const emailPattern = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/
    return emailPattern.test(possibleEmail)
  }

  const submitEmail = async (e) => {
    e.preventDefault()
    if (isEmailValid(email)) {
      await fetch(`/api/convertkit?email=${encodeURIComponent(email)}`)
      setEmail('')
      localForage.setItem('registered', true)
      setIsRegistered(true)
    } else {
      window.alert('Invalid email format')
    }
  }
  return (
    <>
      {type === 'hero' && (
        <div className='bg-white '>
          <div className='overflow-hidden sm:pt-12 lg:relative lg:py-24'>
            <div className='mx-auto max-w-md sm:max-w-3xl lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-18'>
              <div>
                <div className='mt-20'>
                  <div className='mt-6 sm:max-w-xl'>
                    <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
                      Hi, I'm Drew 👋
                    </h1>
                    <p
                      style={{ marginTop: '16px' }}
                      className='text-xl text-gray-500'
                    >
                      {copy}
                    </p>
                    {isRegistered && (
                      <div className='flex justify-center items-center lg:justify-start lg:items-start pt-8 '>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          className='h-8 w-8 text-green-500'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        <p className='pl-1 text-xl font-extrabold text-gray-700 tracking-tight'>
                          Thanks for signing up!
                        </p>
                      </div>
                    )}
                  </div>
                  {!isRegistered && (
                    <form
                      action='#'
                      style={{ marginTop: '16px' }}
                      className='mt-12 sm:max-w-lg sm:w-full sm:flex'
                    >
                      <div className='min-w-0 flex-1'>
                        <label htmlFor='hero_email' className='sr-only'>
                          Email address
                        </label>
                        <input
                          id='hero_email'
                          name='email'
                          type='email'
                          autoComplete='email'
                          required
                          className='block w-full border border-gray-300 rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                          placeholder='Enter your email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className='mt-4 sm:mt-0 sm:ml-3'>
                        <button
                          type='submit'
                          onClick={submitEmail}
                          className='block w-full rounded-md border border-transparent px-5 py-3 bg-blue-600 text-base font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-10'
                        >
                          Subscribe
                        </button>
                      </div>
                    </form>
                  )}
                  <div style={{ marginTop: '12px' }} className='mt-6'>
                    <div className='inline-flex items-center divide-x divide-gray-300'>
                      <div className='min-w-0 flex-1 py-1 text-sm text-gray-500 sm:py-3'>
                        <span className='font-medium text-gray-900'>
                          Recent issue:{' '}
                        </span>{' '}
                        <Link href={newsletter.url} passHref>
                          <a className='italic'>{newsletter.title}</a>
                        </Link>
                        {' — '}
                        <span className='font-medium text-blue-600'>
                          <Link passHref href={newsletter.url}>
                            <a>Read it</a>
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='sm:mx-auto sm:max-w-3xl sm:px-6'>
              <div className='py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
                <div className='relative sm:max-w-sm sm:px-0 lg:max-w-none lg:h-full lg:pl-24'>
                  <Image
                    className='w-full rounded-full ring-2 ring-blue-500 ring-opacity-10 lg:h-full lg:w-auto lg:max-w-none'
                    src={me}
                    alt=''
                    height='300'
                    width='300'
                    loading='eager'
                    placeholder='blur'
                    onClick={() => {
                      router.push('/about')
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {type === 'cta' && (
        <div className='bg-white '>
          <div className='pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-24'>
            <div className='mx-auto max-w-md sm:max-w-3xl lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-18'>
              <div>
                <div className='mt-20'>
                  <div className='mt-6 sm:max-w-xl'>
                    <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
                      Want to read more articles like this?
                    </h1>
                    <p
                      style={{ marginTop: '16px' }}
                      className='text-xl text-gray-500'
                    >
                      {copy}
                    </p>
                    {isRegistered && (
                      <div className='flex justify-center items-center lg:justify-start lg:items-start pt-8 '>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          className='h-8 w-8 text-green-500'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        <p className='pl-1 text-xl font-extrabold text-gray-700 tracking-tight'>
                          Thanks for signing up!
                        </p>
                      </div>
                    )}
                  </div>
                  {!isRegistered && (
                    <form
                      action='#'
                      style={{ marginTop: '16px' }}
                      className='mt-12 sm:max-w-lg sm:w-full sm:flex'
                    >
                      <div className='min-w-0 flex-1'>
                        <label htmlFor='hero_email' className='sr-only'>
                          Email address
                        </label>
                        <input
                          id='hero_email'
                          name='email'
                          type='email'
                          autoComplete='email'
                          required
                          className='block w-full border border-gray-300 rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                          placeholder='Enter your email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className='mt-4 sm:mt-0 sm:ml-3'>
                        <button
                          type='submit'
                          onClick={submitEmail}
                          className='block w-full rounded-md border border-transparent px-5 py-3 bg-blue-600 text-base font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-10'
                        >
                          Subscribe
                        </button>
                      </div>
                    </form>
                  )}
                  <div style={{ marginTop: '12px' }} className='mt-6'>
                    <div className='inline-flex items-center divide-x divide-gray-300'>
                      <div className='min-w-0 flex-1 py-1 text-sm text-gray-500 sm:py-3'>
                        <span className='font-medium text-gray-900'>
                          Recent issue:{' '}
                        </span>{' '}
                        <Link href={newsletter.url} passHref>
                          <a className='italic'>{newsletter.title}</a>
                        </Link>
                        {' — '}
                        <span className='font-medium text-blue-600'>
                          <Link passHref href={newsletter.url}>
                            <a>Read it</a>
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='sm:mx-auto sm:max-w-3xl sm:px-6'>
              <div className='py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
                <div className='relative sm:max-w-sm sm:px-0 lg:max-w-none lg:h-full lg:pl-24'>
                  <Image
                    className='w-full rounded-full ring-2 ring-blue-500 ring-opacity-10 lg:h-full lg:w-auto lg:max-w-none'
                    src={me}
                    alt=''
                    height='300'
                    width='300'
                    loading='eager'
                    placeholder='blur'
                    onClick={() => {
                      router.push('/about')
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {type === 'inline' && (
        <div className='bg-white'>
          <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8'>
            <h2 className='inline text-3xl font-extrabold tracking-tight text-gray-900 sm:block sm:text-4xl'>
              Want to read more articles like this?
            </h2>
            <p className='inline text-3xl font-extrabold tracking-tight text-blue-600 sm:block sm:text-4xl'>
              Sign up for the free newsletter.
            </p>
            {isRegistered && (
              <div className='flex justify-center items-center lg:justify-start lg:items-start pt-8 '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='h-8 w-8 text-green-500'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <p className='pl-1 text-xl font-extrabold text-gray-700 tracking-tight'>
                  Thanks for signing up!
                </p>
              </div>
            )}
            {!isRegistered && (
              <form style={{ marginTop: '8px' }} className='mt-8 sm:flex'>
                <label htmlFor='emailAddress' className='sr-only'>
                  Email address
                </label>
                <input
                  id='emailAddress'
                  className='w-full px-5 py-3 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs border-gray-300 rounded-md'
                  placeholder='Enter your email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className='mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0'>
                  <button
                    type='submit'
                    onClick={submitEmail}
                    className='w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
