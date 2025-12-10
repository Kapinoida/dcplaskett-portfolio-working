import Category from '@/components/blog/category';
import { getAllPostsData } from '@/lib/markdown';
import Link from 'next/link';
import Featured from '@/components/blog/featuredblog';

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
    <div className='flex min-h-screen flex-col items-center justify-start pt-24 mx-4'>
      <h1 className='md:text-4xl text-3xl py-4'>Blog.</h1>
      <h1 className='md:text-4xl text-3xl py-4'>Featured.</h1>
      <Featured />
      <h1 className='md:text-4xl text-3xl py-4'>Posts.</h1>
      <ul className={`grid gap-8 grid-col-1 ${
        allPostsData.length <= 1
          ? 'md:grid-col-1'
          : allPostsData.length === 2
          ? 'md:grid-cols-2'
          : 'md:grid-cols-3'
        }`}>
        {allPostsData.length > 0 ? (
        allPostsData.map(({ id, date, title, subtitle, category }) => (
            <li key={id}>
              <Link href={`/blog/${id}`}>
                <Category catergory={category!} />
                <h2 className='bold text-2xl'>{title}</h2>
                <p>{subtitle}</p>
                <small>{date}</small>
              </Link>
            </li>
          ))
        ) : (
          <p>No posts at this time.</p>
        )}
      </ul>
    </div>
  );
};

export default Blog;
