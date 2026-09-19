const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const contentFolders = ['blog', 'journal']

function collectEntries() {
  return contentFolders
    .flatMap((source) => {
      const root = path.join(process.cwd(), 'data', source)
      if (!fs.existsSync(root)) return []

      const walk = (directory) =>
        fs.readdirSync(directory, { withFileTypes: true }).flatMap((item) => {
          const absolutePath = path.join(directory, item.name)
          if (item.isDirectory()) return item.name === 'private' ? [] : walk(absolutePath)
          if (!/\.mdx?$/.test(item.name)) return []

          const { data } = matter(fs.readFileSync(absolutePath, 'utf8'))
          if (data.draft || data.status === 'draft' || data.status === 'private') return []
          return [
            {
              date: new Date(data.date || 0).getTime(),
              source,
              slug: path.relative(root, absolutePath).replace(/\\/g, '/').replace(/\.mdx?$/, ''),
              isProject: Array.isArray(data.tags) && data.tags.includes('Projects'),
            },
          ]
        })

      return walk(root)
    })
    .sort((a, b) => b.date - a.date)
}

const baseUrl = 'https://blahmir.github.io'
const entries = collectEntries()
const projectRoutes = entries
  .filter((entry) => entry.source === 'blog' && entry.isProject)
  .map((entry) => `/projects/${entry.slug.split('/').at(-1)}/`)
const routes = [
  '/',
  '/projects/',
  ...projectRoutes,
]
const urls = routes.map((route) => `  <url><loc>${baseUrl}${route}</loc></url>`).join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap)
