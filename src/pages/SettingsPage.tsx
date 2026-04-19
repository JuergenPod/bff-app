import { useState } from "react";
import { LogOut, RefreshCw, Eye, EyeOff, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PageTransition } from "@/components/layout/PageTransition";
import { GradientHeading } from "@/components/shared/GradientHeading";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useSettings } from "@/context/SettingsContext";
import { useApp } from "@/context/AppContext";
import { createOctokitClient, testConnection, dataFileExists, initializeRepo } from "@/lib/github";

export function SettingsPage() {
  const { pat, owner, repo, saveConfig, disconnect } = useSettings();
  const { refresh } = useApp();
  const [showPat, setShowPat] = useState(false);
  const [newPat, setNewPat] = useState("");
  const [newRepo, setNewRepo] = useState(`${owner}/${repo}`);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [showDisconnect, setShowDisconnect] = useState(false);

  const maskedPat = pat ? `${pat.slice(0, 6)}${"•".repeat(12)}${pat.slice(-4)}` : "";

  const handleUpdate = async () => {
    const parts = newRepo.trim().split("/");
    if (parts.length !== 2 || (!newPat && !pat)) return;
    setSaving(true);
    setSaveMsg("");
    try {
      const activePat = newPat.trim() || pat;
      const [o, r] = parts;
      const octokit = createOctokitClient(activePat);
      const ok = await testConnection(octokit, o, r);
      if (!ok) throw new Error("Connection failed");
      const exists = await dataFileExists(octokit, o, r);
      if (!exists) await initializeRepo(octokit, o, r);
      saveConfig(activePat, o, r);
      await refresh();
      setSaveMsg("Settings saved ✓");
      setNewPat("");
    } catch (e) {
      setSaveMsg(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageTransition>
      <GradientHeading className="text-2xl mb-6">Settings</GradientHeading>

      <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm space-y-5">
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Current connection</h3>
          <p className="text-sm text-gray-500">
            Repo: <span className="font-mono text-gray-700">{owner}/{repo}</span>
          </p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-gray-500 font-mono">
              PAT: {showPat ? pat : maskedPat}
            </p>
            <button onClick={() => setShowPat((v) => !v)} className="text-gray-400">
              {showPat ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Update connection</h3>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">New PAT (leave blank to keep current)</label>
            <Input
              type="password"
              placeholder="ghp_xxxxxxxxxxxx"
              value={newPat}
              onChange={(e) => setNewPat(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Repo (owner/name)</label>
            <Input
              value={newRepo}
              onChange={(e) => setNewRepo(e.target.value)}
              className="rounded-xl"
            />
          </div>
          {saveMsg && (
            <p className={`text-sm ${saveMsg.includes("✓") ? "text-emerald-600" : "text-red-600"}`}>{saveMsg}</p>
          )}
          <Button
            onClick={handleUpdate}
            disabled={saving}
            className="w-full bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-xl font-semibold"
          >
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>

        <Separator />

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={refresh}
            className="flex-1 rounded-xl"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh data
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowDisconnect(true)}
            className="flex-1 rounded-xl text-red-500 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" /> Disconnect
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={showDisconnect}
        title="Disconnect?"
        description="This removes your PAT from this browser. Your data in GitHub stays safe."
        onConfirm={() => { disconnect(); }}
        onCancel={() => setShowDisconnect(false)}
      />
    </PageTransition>
  );
}
