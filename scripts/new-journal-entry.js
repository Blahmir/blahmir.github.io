const fs = require('fs')
const path = require('path')

const root = process.cwd()
const args = process.argv.slice(2)
const statusArgIndex = args.findIndex((arg) => arg === '--status')
const requestedStatus = statusArgIndex >= 0 ? args[statusArgIndex + 1] : 'draft'
const titleArgs = []

for (let index = 0; index < args.length; index += 1) {
  if (args[index] === '--status') {
    index += 1
  } else {
    titleArgs.push(args[index])
  }
}

const title = titleArgs.join(' ').trim()

const allowedStatuses = new Set(['draft', 'public', 'private'])

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function formatDate(date) {
  return date.toISOString().slice(0, 10)
}

if (!title) {
  console.error('Usage: npm run journal:new -- "Entry title" [--status draft|public|private]')
  process.exit(1)
}

if (!allowedStatuses.has(requestedStatus)) {
  console.error('Status must be one of: draft, public, private')
  process.exit(1)
}

const today = formatDate(new Date())
const slug = slugify(title)
const folder =
  requestedStatus === 'private'
    ? path.join(root, 'data', 'journal', 'private')
    : path.join(root, 'data', 'journal')
const filePath = path.join(folder, `${today}-${slug}.mdx`)

if (fs.existsSync(filePath)) {
  console.error(`Journal entry already exists: ${path.relative(root, filePath)}`)
  process.exit(1)
}

fs.mkdirSync(folder, { recursive: true })

const draft = requestedStatus === 'public' ? 'false' : 'true'
const content = `---
title: '${title.replace(/'/g, "''")}'
date: '${today}'
tags: []
status: '${requestedStatus}'
draft: ${draft}
summary: ''
---

Write here.
`

fs.writeFileSync(filePath, content)

console.log(`Created ${path.relative(root, filePath)}`)
