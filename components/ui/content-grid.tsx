import Link from 'next/link';
import Image from 'next/image';
import Category from '@/components/blog/category';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  href: string;
  thumbnail?: string;
  category?: string;
}

interface ContentGridProps {
  items: ContentItem[];
  emptyMessage?: string;
}

export default function ContentGrid({ items, emptyMessage = "No items found." }: ContentGridProps) {
  return (
    <div className='flex flex-col mx-auto'>
      <ul className={`grid gap-8 grid-col-1 ${
        items.length <= 1
          ? 'md:grid-col-1'
          : items.length === 2
          ? 'md:grid-cols-2'
          : 'md:grid-cols-3'
        }`}>
        {items.length > 0 ? (
          items.map(({ id, title, description, href, thumbnail, category }) => (
            <li key={id} className='block group'>
              <Link href={href} className='flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-2 p-6 rounded-2xl hover:bg-secondary/40'>
                {thumbnail && (
                    <div className='overflow-hidden rounded-3xl mb-4 shadow-sm group-hover:shadow-md transition-shadow'>
                        <Image src={thumbnail} alt={title} width={200} height={200} className='transition-transform duration-500 group-hover:scale-105' />
                    </div>
                )}
                {category && (
                    <Category catergory={category} />
                )}
                <h2 className='bold mt-2'>{title}</h2>
                <p className='text-sm text-muted-foreground'>{description}</p>
              </Link>
            </li>
          ))
        ) : (
          <p>{emptyMessage}</p>
        )}
      </ul>
    </div>
  );
}
