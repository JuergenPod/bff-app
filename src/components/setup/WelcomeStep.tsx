import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl dark:bg-slate-900/80">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="text-7xl mb-4"
      >
        💫
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-500 via-violet-500 to-amber-500 bg-clip-text text-transparent mb-2">
          BFF Moments
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Your shared memory vault — plan adventures, relive memories, celebrate friendship.
        </p>
        <div className="flex justify-center gap-4 mb-8 text-4xl">
          <span>🍜</span><span>🎵</span><span>🥾</span>
        </div>
        <Button
          onClick={onNext}
          className="w-full bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600 text-white font-semibold rounded-2xl h-12"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Let's Connect
        </Button>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 flex items-center justify-center gap-1">
          <Heart className="w-3 h-3" /> Your data stays private — only you two can see it
        </p>
      </motion.div>
    </div>
  );
}
