import os from 'os'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import log4js from 'log4js'
import { Client } from '@elastic/elasticsearch'

const client = new Client({
  node: process.env.ELASTIC_URL,
  // auth: {
  //   username: process.env.ELASTIC_USER,
  //   password: process.env.ELASTIC_PASSWORD
  // },
  ssl: { rejectUnauthorized: false }
})

const hostname = os.hostname()
/** 現在のDateオブジェクト作成 */
const d = new Date()

/** 日付を文字列にフォーマットする */
const directoryFormatted = `
${d.getFullYear()}
${(d.getMonth() + 1).toString().padStart(2, '0')}
${d.getDate().toString().padStart(2, '0')}
`.replace(/\n|\r/g, '')

const patternFormatted = `-
${d.getFullYear()}-
${(d.getMonth() + 1).toString().padStart(2, '0')}-
${d.getDate().toString().padStart(2, '0')}
`.replace(/\n|\r/g, '')

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    system: {
      type: 'dateFile',
      filename: `logs/${directoryFormatted}/${hostname}_NodeServer.log${patternFormatted}`
    }
  },
  categories: {
    default: {
      appenders: ['console', 'system'],
      level: 'ALL'
    }
  }
})
const logger = log4js.getLogger('system')
const router = express.Router()
const app = express()
app.use(cors())
router.use(
  bodyParser.urlencoded({
    extended: true
  })
)
router.use(bodyParser.json())

router.post('/elasticSearch', (req, res) => {
  logger.debug('ElasticSearchを叩いた')
  const context = req.body.queryText
  logger.debug(req.body.queryText)
  logger.debug('ESのURL')
  logger.debug(process.env.ELASTIC_URL)
  client.search(
    {
      index: 'station',
      body: {
        collapse: {
          field: 'name.keyword'
        },
        query: {
          bool: {
            should: [
              {
                match: {
                  'name.suggest': {
                    query: context
                  }
                }
              },
              {
                match: {
                  'name.readingform': {
                    query: context,
                    fuzziness: 'AUTO',
                    operator: 'and'
                  }
                }
              }
            ]
          }
        }
      }
    },
    (err, result) => {
      if (err) {
        console.log(err)
        logger.debug(err)
      }
      logger.debug('叩いた')
      logger.debug(result)
      res.send(result.body)
    }
  )
})

module.exports = router
