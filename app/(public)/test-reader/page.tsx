import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function TestReaderPage() {
  const posts = await reader.collections.blog.all();
  
  return (
    <div>
      <h1>Reader Test</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
