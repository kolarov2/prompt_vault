"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Profile } from "@/lib/types";

export default function WalletAdjustRow({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  async function ajustar() {
    if (!amount) return;
    setLoading(true);
    const res = await fetch("/api/admin/carteira", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: profile.id, amount, note }),
    });
    setLoading(false);
    if (res.ok) {
      setOpen(false);
      setAmount(0);
      setNote("");
      router.refresh();
    } else {
      alert("Não foi possível ajustar a carteira.");
    }
  }

  return (
    <div className="px-4 py-3 text-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium truncate">{profile.email}</p>
          <p className="text-xs text-ink-soft font-mono">
            desde {new Date(profile.created_at).toLocaleDateString("pt-BR")}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-mono font-bold">{profile.wallet_balance} CR</span>
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-xs font-mono text-signal underline"
          >
            ajustar
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-3 flex flex-wrap items-center gap-2 bg-paper-dim p-3 rounded-sm">
          <input
            type="number"
            placeholder="+10 ou -10"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-24 border border-line rounded-sm px-2 py-1 font-mono text-xs"
          />
          <input
            placeholder="motivo (opcional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="flex-1 min-w-32 border border-line rounded-sm px-2 py-1 text-xs"
          />
          <button
            onClick={ajustar}
            disabled={loading}
            className="text-xs font-mono bg-ink text-paper px-3 py-1.5 rounded-sm disabled:opacity-50"
          >
            {loading ? "salvando..." : "confirmar"}
          </button>
        </div>
      )}
    </div>
  );
}