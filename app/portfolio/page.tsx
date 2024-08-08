import { getAllPostsData } from '../../lib/markdown';
import Link from 'next/link';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const allPostsData = getAllPostsData('portfolio');
  return allPostsData.map((post) => ({
    id: post.id,
  }));
}

const Portfolio = async () => {
  const allPostsData = getAllPostsData('portfolio');
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='text-4xl py-4'>portfolio.</h1>
      <ul>
        {allPostsData.map(({ id, date, title, description }) => (
          <li key={id}>
            <Link href={`/portfolio/${id}`}>
              <h2>{title}</h2>
              <p>{description}</p>
              <small>{date}</small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;
