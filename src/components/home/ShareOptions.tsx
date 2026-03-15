// ShareMenu.tsx
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
        className="hover:bg-white/10 rounded-full m-2 flex items-center justify-center transition mr-0"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Share2 size={24} className="m-3" />
      </button>

      {open && (
        <div className="absolute left-4 top-12 mb-2 w-32 rounded-xl bg-[#111628] border border-white/10 shadow-xl overflow-hidden z-50">
          <button
            onClick={handleCopy}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-400 shrink-0" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Link size={16} className="shrink-0" />
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
