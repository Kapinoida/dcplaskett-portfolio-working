import { getAllPostsData } from '../../lib/markdown';
import Link from 'next/link';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const allPostsData = getAllPostsData('blog');
  return allPostsData.map((post) => ({
    id: post.id,
  }));
}

const Blog = async () => {
  const allPostsData = getAllPostsData('blog');
  return (
    <div className='flex min-h-screen flex-col items-center justify-start p-24'>
      <h1 className='text-4xl py-4'>Blog.</h1>
      <ul>
        {allPostsData.map(({ id, date, title, subtitle }) => (
          <li key={id}>
            <Link href={`/blog/${id}`}>
              <h2>{title}</h2>
              <p>{subtitle}</p>
              <small>{date}</small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
