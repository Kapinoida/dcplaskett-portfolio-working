import { getAllPostsData } from '@/lib/markdown';
import ContentGrid, { ContentItem } from '@/components/ui/content-grid';

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

  const items: ContentItem[] = featuredBlogs.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.subtitle || '', // Fallback for description
    href: `/blog/${post.id}`,
    category: post.category,
  }));

  return (
    <ContentGrid items={items} emptyMessage="No featured posts at this time." />
  );
};

export default FeaturedBlog;