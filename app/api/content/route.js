import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  const contentDirectory = path.join(process.cwd(), 'content', 'pages');
  const files = fs.readdirSync(contentDirectory);

  const pages = files.map((fileName) => {
    const filePath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: fileName.replace(/\.md$/, ''),
      title: data.title,
      content: content,
    };
  });

  return NextResponse.json(pages);
}