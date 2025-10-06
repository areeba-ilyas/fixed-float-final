// components/ClipboardCopy.tsx
'use client';
import { useState } from 'react';

export default function ClipboardCopy() {
  const [copyStatus, setCopyStatus] = useState('');

  const copyToClipboard = async (text: string) => {
    try {
      // Modern clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopyStatus('Copied to clipboard!');
      } 
      // Fallback for older browsers
      else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopyStatus('Copied!');
      }
    } catch (error) {
      console.error('Copy failed:', error);
      setCopyStatus('Copy failed');
      
      // Last resort - show text for manual copy
      alert(`Please copy manually: ${text}`);
    }
    
    setTimeout(() => setCopyStatus(''), 2000);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => copyToClipboard('Your exchange details here')}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Copy to Clipboard
      </button>
      {copyStatus && <p className="text-green-600 mt-2">{copyStatus}</p>}
    </div>
  );
}