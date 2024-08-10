import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export function getPostData(directory: string, fileName: string) {
  const fullPath = path.join(contentDirectory, directory, `${fileName}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = remark()
    .use(html)
    .processSync(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    fileName,
    title: matterResult.data.title,
    description: matterResult.data.description,
    date: matterResult.data.date,
    subtitle: matterResult.data.subtitle,
    ...matterResult.data,
    contentHtml,
  };
}

export function getAllPostsData(directory: string) {
  const dirPath = path.join(contentDirectory, directory);
  const fileNames = fs.readdirSync(dirPath);

  type PostData = {
    id: string;
    date?: string; 
    title: string;
    description: string;
    subtitle?: string;
  };

  const allPostsData: PostData[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(dirPath, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
        id,
        title: matterResult.data.title,
        description: matterResult.data.description,
        date: matterResult.data.date,
        subtitle: matterResult.data.subtitle,
        ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date && b.date) {
      return a.date < b.date ? 1 : -1;
    }
    return 0; // Handle the case when either a or b does not have a date property
  });
}
