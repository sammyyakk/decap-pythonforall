import fs from 'fs';
import path from 'path';
import MarkdownPage from '../components/MarkdownPage';

export default function DynamicPage({ params }) {
  return <MarkdownPage filePath={`pages/${params.slug}.md`} />;
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content', 'pages');
  const files = fs.readdirSync(contentDir);

  return files.map(file => ({
    slug: file.replace(/\.md$/, '')
  }));
}
