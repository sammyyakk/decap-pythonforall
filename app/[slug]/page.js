import MarkdownPage from '../components/MarkdownPage'

export default function DynamicPage({ params }) {
  return <MarkdownPage filePath={`pages/${params.slug}.md`} />
}

export async function generateStaticParams() {
  const fs = require('fs')
  const path = require('path')
  const contentDir = path.join(process.cwd(), 'content', 'pages')
  const files = fs.readdirSync(contentDir)
  
  return files.map(file => ({
    slug: file.replace(/\.md$/, '')
  }))
}