// src/post-cats/index.mjs
import arc from '@architect/functions'
import tiny from 'tiny-json-http'

function isJSON (req) {
  let contentType = req.headers['Content-Type'] ||
        req.headers['content-type']

  return /application\/json/ig.test(contentType)
}

export const handler = arc.http.async(http)

async function http (req) {
  let res = await tiny.get({
    url: 'https://api.thecatapi.com/v1/images/search'
  })
  let cat = res.body[0]

  const db = await arc.tables()
  await db.cats.put(cat)

  if (isJSON(req)) {
    return {
      json: cat
    }
  } else {
    return {
      location: '/cats'
    }
  }
}
