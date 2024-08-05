import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="A personal blog and portfolio site built with Next.js, TypeScript, and Markdown." />
          <meta property="og:title" content="My Blog and Portfolio" />
          <meta property="og:description" content="A personal blog and portfolio site built with Next.js, TypeScript, and Markdown." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://your-site-url.com" />
          <meta property="og:image" content="https://your-site-url.com/og-image.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
