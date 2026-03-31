

import { useState, useRef, useEffect } from "react";
import { Share2, Link, Check } from "lucide-react";

const ShareOptions = ({ serialId }: { serialId: number | string }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/e/${serialId}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1500);
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        className="hover:bg-white/[0.06] rounded-lg p-1.5 flex items-center justify-center transition-all duration-200 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Share2 size={16} className="text-gray-500" />
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-36 rounded-xl bg-echo-bg/95 backdrop-blur-xl border border-white/[0.08] shadow-xl overflow-hidden z-50 animate-modal-in">
          <button
            onClick={handleCopy}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs text-white hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400 shrink-0" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Link size={14} className="shrink-0" />
                <span>Copy link</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareOptions;
