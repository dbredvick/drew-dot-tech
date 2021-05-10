import fetch from 'isomorphic-unfetch'

export async function getRevueIssues() {
  const baseUrl = 'https://www.getrevue.co/api'

  const res = await fetch(`${baseUrl}/v2/issues`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.REVUE_API}` }
  })
  const data = await res.json()
  return data.map((x) =>
    x.url.replace(
      'https://www.getrevue.co/profile/dbredvick/issues',
      '/newsletter'
    )
  )
}

export async function getRevueIssuesData() {
  const baseUrl = 'https://www.getrevue.co/api'

  const res = await fetch(`${baseUrl}/v2/issues`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.REVUE_API}` }
  })
  const data = await res.json()
  return data.map((x) => ({
    ...x,
    url: x.url.replace(
      'https://www.getrevue.co/profile/dbredvick/issues',
      '/newsletter'
    )
  }))
}
