import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PATInputStep } from "./PATInputStep";
import { WelcomeStep } from "./WelcomeStep";
import { useApp } from "@/context/AppContext";

type Step = "welcome" | "pat" | "done";

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

function DoneStep() {
  const navigate = useNavigate();
  const { refresh } = useApp();

  useEffect(() => {
    const t = setTimeout(async () => {
      await refresh();
      navigate("/dashboard");
    }, 1500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-7xl mb-4"
      >
        🎉
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your vault is ready!</h2>
      <p className="text-gray-500">Taking you to your memories...</p>
    </div>
  );
}

export function SetupWizard() {
  const [step, setStep] = useState<Step>("welcome");

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-violet-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden">
        <AnimatePresence mode="wait" custom={1}>
          <motion.div
            key={step}
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {step === "welcome" && <WelcomeStep onNext={() => setStep("pat")} />}
            {step === "pat" && <PATInputStep onSuccess={() => setStep("done")} />}
            {step === "done" && <DoneStep />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
