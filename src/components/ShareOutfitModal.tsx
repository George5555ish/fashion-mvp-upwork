import { useState } from 'react';
import { Check, Copy, Share2, X } from 'lucide-react';
import { siteConfig } from '../config/site';

interface ShareOutfitModalProps {
  outfitName: string;
  shareId: string;
  onClose: () => void;
}

export default function ShareOutfitModal({ outfitName, shareId, onClose }: ShareOutfitModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${siteConfig.url}/share/outfit/${shareId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <Share2 size={18} className="text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">Share outfit</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <p className="text-sm text-gray-600">
            Send this link to a friend so they can see what you&apos;re planning to wear:
            <span className="font-medium text-gray-900"> {outfitName}</span>
          </p>

          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 break-all">
            {shareUrl}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Link copied!' : 'Copy link'}
          </button>
        </div>
      </div>
    </div>
  );
}
