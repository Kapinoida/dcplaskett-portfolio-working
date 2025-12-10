export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Keystatic Admin</title>
      </head>
      <body>
        <div id="debug-error" style={{ color: 'red', zIndex: 9999 }}></div>
        <script dangerouslySetInnerHTML={{ __html: `
          window.onerror = function(msg, url, line) {
            const err = 'ERROR: ' + msg + ' at ' + url + ':' + line;
            document.getElementById('debug-error').innerText = err;
            window.__KEYSTATIC_ERROR__ = err;
          };
          window.addEventListener('unhandledrejection', function(event) {
             const err = 'PROMISE ERROR: ' + event.reason;
            document.getElementById('debug-error').innerText = err;
            window.__KEYSTATIC_ERROR__ = err;
          });
        `}} />
        {children}
      </body>
    </html>
  );
}
