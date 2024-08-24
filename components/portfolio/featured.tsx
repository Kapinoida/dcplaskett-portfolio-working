import { getAllPostsData } from '@/lib/markdown';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const allPostsData = getAllPostsData('portfolio');
  return allPostsData.map((post) => ({
    id: post.id,
  }));
}

const Featured = async () => {
  const allPostsData = getAllPostsData('portfolio');

  // Filter for featured projects
  const featuredProjects = allPostsData.filter(({ featured }) => featured);

  return (
    <div className='flex flex-col mx-auto'> 
      
      <ul className={`grid gap-8 grid-col-1 ${
        featuredProjects.length <= 1
          ? 'md:grid-col-1'
          : featuredProjects.length === 2
          ? 'md:grid-cols-2'
          : 'md:grid-cols-3'
        }`}>
            {featuredProjects.length > 0 ? (
                featuredProjects.map(({ id, title, description, thumbnail }) => (
                    <li key={id} >
                        <Link href={`/portfolio/${id}`} className='flex flex-col justify-center items-center'>
                            {thumbnail && (
                                <Image src={thumbnail} alt={title} width={200} height={200} className='rounded-3xl p-4' />
                            )}
                            <h2 className='bold'>{title}</h2>
                            <p className='text-sm'>{description}</p>
                        </Link>
                    </li>
                ))
        ) : (
          <p>No featured projects at this time.</p>
        )}
      </ul>
    </div>
  );
};

export default Featured;
