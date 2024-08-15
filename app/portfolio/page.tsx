import Featured from '@/components/portfolio/featured';
import { getAllPostsData } from '@/lib/markdown';
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
    <div className='flex min-h-screen flex-col items-center justify-start p-24'>
      <h1 className='text-4xl py-4'>Portfolio.</h1>
      <h1 className='text-4xl py-4'>Featured.</h1>
      <Featured />
      <h1 className='text-4xl py-4'>Projects.</h1>
      <ul className={`grid gap-8 ${
        allPostsData.length <= 1
          ? 'grid-cols-1'
          : allPostsData.length === 2
          ? 'grid-cols-2'
          : 'grid-cols-3'
        }`}>
        {allPostsData.length > 0 ? (
          allPostsData.map(({ id, title, description, skills }) => (
            <li key={id}>
              <Link href={`/portfolio/${id}`}>
                <h2 className='bold text-2xl'>{title}</h2>
                <p>{description}</p>
                <small>{skills?.map((skill) => skill + ' ')}</small>
              </Link>
            </li>
          ))
        ) : (
          <p>No projects at this time.</p>
        )}
      </ul>
    </div>
  );
};

export default Portfolio;
