import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const email = req.query.email
    console.log(process.env.CONVERTKIT_API_KEY)
    const formId = 2263843
    const data = {
      api_key: process.env.CONVERTKIT_API_KEY,
      email: email
    }
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
    return res.send(await response.json())
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
