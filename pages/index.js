import { useEffect } from 'react';
import io from 'socket.io-client';

let socket;

export default function Home() {
  useEffect(() => {
    socket = io();

    socket.on('broadcast-message', (data) => {
      const searchQuery = encodeURIComponent(data.message);
      const youtubeUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

      // فتح تبويب جديد تلقائيًا
      window.open(youtubeUrl, '_blank');
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📺 انتظر فتح تبويب يوتيوب تلقائي...</h1>
    </div>
  );
}
