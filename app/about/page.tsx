
import Contact from '@/components/contact/contact';
import { getPostData, getAllPostsData } from '../../lib/markdown';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const allPostsData = getAllPostsData('about');
  return allPostsData.map((post) => ({
    id: post.id,
  }));
}

const About = async ({ params }: { params: { id: string } }) => {
  const postData = getPostData('about', 'about');
  if (!postData) {
    notFound();
  }

  return (
    <div className='flex flex-col min-h-screen items-center justify-start pt-24 text-justify'>
      <div className='md:max-w-4xl mx-4' id='about' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      <div className="flex flex-col items-center justify-center pb-24">
        <Contact />
      </div>
    </div>
    
  );
};

export default About;
