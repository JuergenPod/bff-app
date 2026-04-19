import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PhotoThumbnail } from "./PhotoThumbnail";

interface Props {
  paths: string[];
  index: number;
  onClose: () => void;
}

export function PhotoLightbox({ paths, index: initialIndex, onClose }: Props) {
  const [current, setCurrent] = useState(initialIndex);
  const prev = () => setCurrent((i) => Math.max(0, i - 1));
  const next = () => setCurrent((i) => Math.min(paths.length - 1, i + 1));

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white"
      >
        <X className="w-5 h-5" />
      </button>

      {current > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-3xl max-h-[85vh] w-full px-16"
        >
          <PhotoThumbnail
            path={paths[current]}
            className="w-full h-full max-h-[85vh] object-contain rounded-xl"
          />
        </motion.div>
      </AnimatePresence>

      {current < paths.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      <div className="absolute bottom-4 flex gap-1.5">
        {paths.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
