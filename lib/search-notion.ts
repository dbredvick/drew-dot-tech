// import ky from 'ky'
import fetch from 'isomorphic-unfetch'
import pMemoize from 'p-memoize'

import { api } from './config'
import * as types from './types'

export const searchNotion = pMemoize(searchNotionImpl, { maxAge: 10000 })

async function searchNotionImpl(
  params: types.SearchParams
): Promise<types.SearchResults> {
  return fetch(api.searchNotion, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then((res) => {
      if (res.ok) {
        return res
      }
      console.log('error', res.statusText)
      // convert non-2xx HTTP responses into errors
      const error: any = new Error(res.statusText)
      console.log(error)
      error.response = res
      return Promise.reject(error)
    })
    .then((res) => res.json())

  // return ky
  //   .post(api.searchNotion, {
  //     json: params
  //   })
  //   .json()
}
