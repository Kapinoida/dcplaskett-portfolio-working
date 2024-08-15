import { getAllPostsData } from '@/lib/markdown';
import Link from 'next/link';
import Category from './category';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const allPostsData = getAllPostsData('blog');
  return allPostsData.map((post) => ({
    id: post.id,
  }));
}

const FeaturedBlog = async () => {
  const allPostsData = getAllPostsData('blog');

  // Filter for featured projects
  const featuredBlogs = allPostsData.filter(({ featured }) => featured);

  return (
    <div className='flex flex-col items-center justify-start'>
      <ul className={`grid grid-cols-${featuredBlogs.length} gap-8`}>
            {featuredBlogs.length > 0 ? (
                featuredBlogs.map(({ id, title, subtitle, category }) => (
                    <li key={id} >
                        <Link href={`/blog/${id}`} className='flex flex-col justify-center items-center'>
                            <Category catergory={category!} />
                            <h2 className='bold'>{title}</h2>
                            <p className='text-sm'>{subtitle}</p>
                        </Link>
                    </li>
                ))
        ) : (
          <p>No featured posts at this time.</p>
        )}
      </ul>
    </div>
  );
};

export default FeaturedBlog;
