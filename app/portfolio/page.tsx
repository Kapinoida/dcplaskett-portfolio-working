import Featured from '@/components/portfolio/featured';
import { getAllPostsData } from '@/lib/markdown';
import Link from 'next/link';
import skillColorMap from "@/components/portfolio/skills-colors";


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
    <div className='flex min-h-screen flex-col items-center justify-start pt-24 mx-4'>
      <h1 className='md:text-4xl text-3xl py-4'>Portfolio.</h1>
      <h1 className='md:text-3xl text-2xl py-4'>Featured.</h1>
      <Featured />
      <h1 className='md:text-3xl text-2xl py-4'>Projects.</h1>
      <ul className={`grid gap-8 ${
        allPostsData.length <= 1
          ? 'md:grid-cols-1 grid-col-1'
          : allPostsData.length === 2
          ? 'md:grid-cols-2 grid-col-1'
          : 'md:grid-cols-3 grid-col-1'
        }`}>
        {allPostsData.length > 0 ? (
          allPostsData.map(({ id, title, description, skills }) => (
            <li key={id}>
              <Link href={`/portfolio/${id}`}>
                <h2 className='bold text-2xl'>{title}</h2>
                <p>{description}</p>
                <small>
                  {skills?.map( (skill) =>
                    <span key={skill} className={`${skillColorMap[skill] || 'text-gray-500'} `}>
                      {skill + ' '}
                    </span>
                    )}
                  </small>
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
