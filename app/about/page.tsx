
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
    <div className='flex flex-col min-h-screen items-center justify-start p-24 text-justify'>
      <div className='max-w-4xl' id='about' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      <div className="flex flex-col items-center justify-center pt-24">
        <Contact />
      </div>
    </div>
    
  );
};

export default About;
