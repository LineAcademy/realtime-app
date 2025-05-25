import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    fetch('/api/socket'); // ضروري لتشغيل السيرفر
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;