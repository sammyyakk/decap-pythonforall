import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function Navigation() {
  const contentDir = path.join(process.cwd(), 'content', 'pages')
  const files = fs.readdirSync(contentDir)
  
  const pages = files.map(file => {
    const fullPath = path.join(contentDir, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return {
      slug: file.replace(/\.md$/, ''),
      title: data.title
    }
  })

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        {pages.map(page => (
          <li key={page.slug}>
            <Link href={`/${page.slug}`} className="hover:text-gray-300">
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}