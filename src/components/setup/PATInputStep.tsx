import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ExternalLink, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createOctokitClient, testConnection, dataFileExists, initializeRepo } from "@/lib/github";
import { useSettings } from "@/context/SettingsContext";

export function PATInputStep({ onSuccess }: { onSuccess: () => void }) {
  const { saveConfig } = useSettings();
  const [pat, setPat] = useState("");
  const [repoInput, setRepoInput] = useState("");
  const [showPat, setShowPat] = useState(false);
  const [status, setStatus] = useState<"idle" | "testing" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleConnect = async () => {
    const parts = repoInput.trim().split("/");
    if (parts.length !== 2 || !pat.trim()) {
      setStatus("error");
      setErrorMsg("Enter your PAT and repo as owner/repo-name");
      return;
    }
    const [owner, repo] = parts;
    setStatus("testing");
    setErrorMsg("");
    try {
      const octokit = createOctokitClient(pat.trim());
      const ok = await testConnection(octokit, owner, repo);
      if (!ok) throw new Error("Repository not found or no access");
      const exists = await dataFileExists(octokit, owner, repo);
      if (!exists) await initializeRepo(octokit, owner, repo);
      saveConfig(pat.trim(), owner, repo);
      setStatus("ok");
      setTimeout(onSuccess, 600);
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Connection failed");
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl dark:bg-slate-900/80">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">Connect your vault</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Your data is stored securely in your private GitHub repo.</p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">GitHub PAT</label>
          <div className="relative">
            <Input
              type={showPat ? "text" : "password"}
              placeholder="ghp_xxxxxxxxxxxx"
              value={pat}
              onChange={(e) => setPat(e.target.value)}
              className="pr-10 rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowPat((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            >
              {showPat ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <a
            href="https://github.com/settings/tokens"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-violet-500 hover:underline flex items-center gap-1 mt-1"
          >
            Create token (needs repo scope) <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Private repo</label>
          <Input
            placeholder="owner/your-private-repo"
            value={repoInput}
            onChange={(e) => setRepoInput(e.target.value)}
            className="rounded-xl"
          />
        </div>

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-xl"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </motion.div>
        )}
        {status === "ok" && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl"
          >
            <CheckCircle2 className="w-4 h-4" />
            Connected!
          </motion.div>
        )}

        <Button
          onClick={handleConnect}
          disabled={status === "testing" || status === "ok"}
          className="w-full bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-2xl h-12 font-semibold"
        >
          {status === "testing" && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {status === "testing" ? "Connecting..." : "Connect"}
        </Button>
      </div>
    </div>
  );
}
