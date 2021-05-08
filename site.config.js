module.exports = {
  // where it all starts -- the site's root Notion page (required)
  rootNotionPageId: '1e0b275c5ca44b4bbf5dc0e24017f593',
  // rootNotionPageId: 'ad594837ce354521a7eed4ffb95954a2',
  // https://www.notion.so/dbredvick/ad594837ce354521a7eed4ffb95954a2?v=1a1cf73bcd58406bb8d74d01520db3f3
  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'drew.tech — bootstrapping products as a solo-founder',
  domain: 'drew.tech',
  author: 'Drew Bredvick',

  // open graph metadata (optional)
  description:
    "I work a full-time job in tech and bootstrap products on the side to earn financial freedom. Let's build something together.",
  socialImageTitle: 'drew.tech',
  socialImageSubtitle: 'Hello World! 👋',

  // social usernames (optional)
  twitter: 'dbredvick',
  github: 'dbredvick',
  linkedin: 'drew-bredvick',

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // image CDN host to proxy all image requests through (optional)
  // NOTE: this requires you to set up an external image proxy
  imageCDNHost: null,

  // Utteranc.es comments via GitHub issue comments (optional)
  utterancesGitHubRepo: 'dbredvick/drew-tech-discussion',

  // whether or not to enable support for LQIP preview images (optional)
  // NOTE: this requires you to set up Google Firebase and add the environment
  // variables specified in .env.example
  isPreviewImageSupportEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //

  // old redirects, won't be needed going forward
  pageUrlOverrides: {
    '/GAM-re-renders-in-react-gpt': '7300453b-de4d-433e-8689-17c0de9f9a36',
    '/giving-away-my-gumroad-side-project':
      '5179e5c9-6bcb-4de1-82ea-5f39d948ba8f',
    '/should-i-use-google-analytics-or-not':
      '148a065f-c516-4055-8f31-6b2d9bdbe3b5',
    '/saas-starters-jump-starting-your-saas':
      'e4af4262-55e2-4c1a-a2f1-9ba000cf34e2',
    '/saas-diligence-instafeed': '4f07a36e-ac60-46fe-8088-fb7dd4d08e71',
    '/the-ripple-of-web-vitals': 'c768446a-0269-4030-906e-cd0337f58eca',
    '/vercel-multiple-repos-same-domain':
      'a89862c8-7048-4939-8bb6-b20e07cb3732',
    '/notion-beats-markdown': '6fdf9bb4-a7c6-4b22-8a6a-6ca4154ebcb2',
    '/next-js-jobs': 'cb774ac1-93c4-44fd-bca9-9754f001c8e2',
    '/about': 'f1fcf280-3850-432f-b311-4313a2a72446',
    '/next-js-conf-highlights-2020': '0bed7dc1-cd28-4f02-a807-8f8d040727a0',
    '/how-to-monitor-core-web-vitals-in-next-js':
      '6c83af11-a7d6-4ea0-83e1-5f1eb71e0075',
    "/rome-wasn't-built-in-a-day-and-neither-was-my-saas-app":
      '01dc66af-1451-43c5-a2aa-f36de761ade4',
    '/how-to-improve-core-web-vitals-in-a-next-js-app':
      '01cd298b-f8bf-43d8-8780-f185bfece556',
    '/why-nextjs': '85cadae7-aa10-459f-9d76-1ae6a01204aa',
    '/nextjs-should-be-static': '79014498-2242-4150-a965-030df3c26fc7',
    "/sent-my-first-nextjs-newsletter-(here's-what-was-in-it)":
      '119726a9-0f8f-45b4-ac27-f58b9f5c09ac',
    '/divjoy-is-it-worth-it': '357f009a-4791-4516-81e0-8dbb4d838789',
    '/what-not-to-work-on': 'e4b67dce-a1b1-4890-9e3f-807893cc8e12',
    '/my-principles-for-blogging': 'ced9881d-d383-4749-aa21-c6be6ad387ad',
    '/one-percent-better-every-day-with-cron-jobs':
      'c7351064-0fc3-4740-8c66-40ca6a8b89df',
    '/i-turned-off-my-notifications': 'e2299594-6b7f-40ec-bbed-6266f3946fc6',
    '/how-to-send-email-with-vercel-domain-through-gsuite':
      'f9caa5c5-c52b-4a79-9000-9f96102ad509',
    '/how-i-pick-my-tech-stack-for-side-projects':
      'e25d8ea1-c067-46a3-8dd5-21115a0021a8',
    "/a-developer's-guide-building-great-software-incrementally-with-analytics":
      '90ea286f-2036-4f24-af52-42d01bbf6e34',
    "/notes-on-naval's-money": '9f0f1c7a-5568-4026-a022-159fafdf4a85',
    "/why-i-didn't-tell-you": 'eddfaeaa-84e8-4bff-8de7-7e58aec59394',
    '/tech-decisions-and-developer-guilt':
      '9525470f-0622-4b57-9d9f-5ee89d421524'
  }
  // pageUrlOverrides: null
}
