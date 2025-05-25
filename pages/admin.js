import { useState, useEffect } from 'react';

export default function Admin() {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    await fetch('/api/broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    setMessage('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎤 صفحة التحكم (أنت فقط)</h1>
      <input
        type="text"
        placeholder="اكتب حاجة"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ padding: 10, width: '100%' }}
      />
      <button onClick={sendMessage} style={{ marginTop: 10 }}>
        إرسال
      </button>
    </div>
  );
}
