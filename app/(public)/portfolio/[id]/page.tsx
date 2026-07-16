import { getPostData, getAllPostsData } from '@/lib/markdown';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Skills from '@/components/portfolio/skills';
import Links from '@/components/portfolio/links';
import Contact from '@/components/contact/contact';

export async function generateStaticParams() {
  const allPostsData = getAllPostsData('portfolio');
  return allPostsData.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const postData = getPostData('portfolio', params.id);
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

const PortfolioPost = async ({ params }: { params: { id: string } }) => {
  const postData = getPostData('portfolio', params.id);
  if (!postData) {
    notFound();
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-start pt-24 m-4'>
      <h1 className='md:text-4xl text-3xl py-4 text-center'>{postData.title}</h1>
      {postData.thumbnail && (
        <Image src={postData.thumbnail} alt={postData.title} width={500} height={500} className='rounded-3xl p-4' />
      )}
      <div className="flex md:flex-row flex-col items-center justify-center p-4 size-max">
        <Skills skills={postData.skills} />
        <Links github={postData.github} live={postData.live} />
      </div>
      <div className='max-w-4xl prose prose-neutral dark:prose-invert mx-auto' id='project' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      <div className='flex items-center justify-center pb-24'><Contact /></div>
    </div>
  );
};

export default PortfolioPost;
