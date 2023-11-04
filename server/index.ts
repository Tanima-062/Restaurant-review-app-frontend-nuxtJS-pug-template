import os from 'os'
import express from 'express'
import consola from 'consola'
import { loadNuxt, build } from 'nuxt'
import log4js from 'log4js'
// Import and Set Nuxt.js options
// let config = require('../nuxt.config.ts')
const envDir = (() => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return '/config/.env.prod'
    case 'test':
      return '/config/.env.test'
    case 'test-fe01':
      return '/config/.env.test-fe01'
    case 'development':
      return '/config/.env.dev'
    case 'development-fe01':
      return '/config/.env.dev-fe02'
    case 'development-fe02':
      return '/config/.env.dev-fe02'
    default:
      return '/config/.env.local'
  }
})()
const srcDir = './src'
/* eslint-disable */
require('dotenv').config({ path: `${srcDir + envDir}` }).parsed
const app = express()

const isDev = process.env.NODE_ENV !== 'production'
/* eslint-disable */
const apiRouter = require('./middle.js')
/* eslint-enable */
// log出力
const hostname = os.hostname()
/** 現在のDateオブジェクト作成 */
const d = new Date()

/** 日付を文字列にフォーマットする */
const directoryFormatted = `${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, '0')}${d
  .getDate()
  .toString()
  .padStart(2, '0')}`.replace(/\n|\r/g, '')

const patternFormatted = `-${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d
  .getDate()
  .toString()
  .padStart(2, '0')}`.replace(/\n|\r/g, '')

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
app.use(log4js.connectLogger(logger, { level: 'auto' }))

async function start() {
  app.use(express.json())
  app.use('/gourmet', apiRouter)
  app.post('/api/error', (req, res) => {
    logger.error(req.body)
    res.json({ message: 'Success Error log' })
  })
  // Init Nuxt.js
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  const { host, port } = nuxt.options.server

  // Render every route with Nuxt
  app.use(nuxt.render)

  // Build only in local mode with hot-reloading
  if (isDev) {
    build(nuxt)
  }

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
  logger.info(`Server listening on http://${host}:${port}`)
}

start()
