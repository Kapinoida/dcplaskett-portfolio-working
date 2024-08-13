import { getPostData, getAllPostsData } from '../../../lib/markdown';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Head from 'next/head';
import Skills from '@/components/portfolio/skills';
import Links from '@/components/portfolio/links';

export async function generateStaticParams() {
  const allPostsData = getAllPostsData('portfolio');
  return allPostsData.map((post) => ({
    id: post.id,
  }));
}

const PortfolioPost = async ({ params }: { params: { id: string } }) => {
  const postData = getPostData('portfolio', params.id);
  if (!postData) {
    notFound();
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-start p-24 w-full'>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={postData.description} />
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.description} />
      </Head>
      <h1 className='text-4xl py-4'>{postData.title}</h1>
      <Image src={postData.thumbnail} alt={postData.title} width={500} height={500} className='rounded-xl p-4' />
      <div className="flex items-start justify-center p-4 size-max">
        <Skills skills={postData.skills} />
        <Links github={postData.github} live={postData.live} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
};

export default PortfolioPost;
