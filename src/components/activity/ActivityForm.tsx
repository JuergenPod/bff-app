import { useEffect, useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { RatingStars } from "./RatingStars";
import { SUGGESTED_EMOJIS, CATEGORY_CONFIG, STATUS_CONFIG } from "@/constants";
import { useApp } from "@/context/AppContext";
import type { Activity, Category, ActivityStatus } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  initial?: Activity;
}

const emptyForm = () => ({
  title: "",
  category: "food" as Category,
  status: "planned" as ActivityStatus,
  date: "",
  location: "",
  notes: "",
  rating: null as number | null,
  emoji: "✨",
  photos: [] as string[],
});

export function ActivityForm({ open, onClose, initial }: Props) {
  const { createActivity, updateActivity } = useApp();
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(initial ? {
        title: initial.title, category: initial.category, status: initial.status,
        date: initial.date, location: initial.location, notes: initial.notes,
        rating: initial.rating, emoji: initial.emoji, photos: initial.photos,
      } : emptyForm());
    }
  }, [open, initial]);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      if (initial) {
        await updateActivity(initial.id, form);
      } else {
        await createActivity(form);
      }
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit activity" : "New activity"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Title *</label>
            <Input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Indie concert at Berghain"
              className="rounded-xl"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
              <Select value={form.category} onValueChange={(v) => set("category", v as Category)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.entries(CATEGORY_CONFIG) as [Category, { label: string; emoji: string }][]).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v.emoji} {v.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
              <Select value={form.status} onValueChange={(v) => set("status", v as ActivityStatus)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.entries(STATUS_CONFIG) as [ActivityStatus, { label: string }][]).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Date</label>
              <Input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className="rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Location</label>
              <Input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="City, venue..." className="rounded-xl" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Emoji</label>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_EMOJIS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => set("emoji", em)}
                  className={`text-xl p-1 rounded-lg hover:bg-gray-100 ${form.emoji === em ? "ring-2 ring-violet-400 bg-violet-50" : ""}`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {form.status === "completed" && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Rating</label>
              <RatingStars value={form.rating} onChange={(v) => set("rating", v)} size="md" />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Notes / Memories</label>
            <Textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="What made it special..."
              className="rounded-xl resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">Cancel</Button>
            <Button
              type="submit"
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-xl font-semibold"
            >
              {saving ? "Saving..." : initial ? "Save changes" : "Add activity"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
