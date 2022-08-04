import arc from '@architect/functions'

export const handler = arc.http.async(http)

async function http (req) {
  const db = await arc.tables()
  let result = await db.cats.scan()
  let cats = result.Items

  return {
    html: `<html>
    <head>
      <script src="./el-submit.js" type="module"></script>
    </head>
    <body>
        <h1>Cats</h1>
        <form method="POST" action="/cats">
            <el-submit eventname="new-cat"><button>Random Cat Picture</button></el-submit>
        </form>
        <ul>
          ${cats.map(cat => `<li><img src="${cat.url}" width="300"/></li>`).join('')}
        </ul>
        <script src="./index.js"></script>
    </body>
</html>`
  }
}
