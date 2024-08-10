import { getPostData, getAllPostsData } from '../../../lib/markdown';
import { notFound } from 'next/navigation';
import Head from 'next/head';

export async function generateStaticParams() {
  const allPostsData = getAllPostsData('blog');
  return allPostsData.map((post) => ({
    id: post.id,
  }));
}

const BlogPost = async ({ params }: { params: { id: string } }) => {
  const postData = getPostData('blog', params.id);
  if (!postData) {
    notFound();
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-start p-24'>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={postData.description} />
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.description} />
      </Head>
      <h1 className='text-4xl py-4'>{postData.title}</h1>
      <h2>{postData.subtitle}</h2>
      <p>{postData.date}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
};

export default BlogPost;
