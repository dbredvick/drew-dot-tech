import fetch from 'isomorphic-unfetch'
export default async function handleEmail(req, res) {
  try {
    const email = req.query.email

    const payload = {}
    // if (typeof sendReport !== 'undefined') {
    //   payload = {
    //     domain,
    //     requested_report_at: Date.now().toString()
    //   }
    // } else {
    //   payload = {
    //     domain
    //   }
    // }

    const formId = 2263843
    const data = {
      api_key: process.env.CONVERTKIT_API_KEY,
      email
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
    const results = await response.json()
    return res.status(200).json(results)
  } catch (err) {
    console.log('email', err)
    return res.status(500).json(err)
  }
}
