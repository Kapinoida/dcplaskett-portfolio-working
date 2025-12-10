import { getAllPostsData } from '@/lib/markdown';
import ContentGrid, { ContentItem } from '@/components/ui/content-grid';

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

  const items: ContentItem[] = featuredProjects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    href: `/portfolio/${project.id}`,
    thumbnail: project.thumbnail,
  }));

  return (
    <ContentGrid items={items} emptyMessage="No featured projects at this time." />
  );
};

export default Featured;
