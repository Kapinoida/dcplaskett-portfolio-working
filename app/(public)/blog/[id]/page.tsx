import { getPostData, getAllPostsData } from '@/lib/markdown';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Category from '@/components/blog/category';

export async function generateStaticParams() {
  const allPostsData = getAllPostsData('blog');
  return allPostsData.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const postData = getPostData('blog', params.id);
    if (!postData) {
        return {
            title: 'Not Found',
            description: 'The page you are looking for does not exist.'
        }
    }
    return {
        title: postData.title,
        description: postData.description,
        openGraph: {
            title: postData.title,
            description: postData.description,
        },
    }
}

const BlogPost = async ({ params }: { params: { id: string } }) => {
  const postData = getPostData('blog', params.id);
  if (!postData) {
    notFound();
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-start pt-24 m-4'>
      <h1 className='md:text-4xl text-3xl py-4'>{postData.title}</h1>
      <h2>{postData.subtitle}</h2>
      <p>{formatDate(postData.date!)}</p>
      <Category catergory={postData.category!} />
      <div className='max-w-4xl prose prose-neutral dark:prose-invert mx-auto' id='blog' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
};

export default BlogPost;
