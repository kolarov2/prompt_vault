"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { RechargeTier } from "@/lib/types";

export default function RechargeTierAdminRow({ tier }: { tier: RechargeTier }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function alternarAtivo() {
    setLoading(true);
    await fetch("/api/admin/recarga", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: tier.id, active: !tier.active }),
    });
    setLoading(false);
    router.refresh();
  }

  async function remover() {
    if (!confirm("Remover esta faixa de recarga?")) return;
    setLoading(true);
    await fetch("/api/admin/recarga", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: tier.id }),
    });
    setLoading(false);
    router.refresh();
  }

  const valorReais = (tier.amount_brl_cents / 100).toFixed(2).replace(".", ",");
  const bonus = tier.credits_awarded - tier.amount_brl_cents / 100;

  return (
    <div className="flex items-center justify-between px-4 py-3 text-sm">
      <div>
        <span className="font-mono font-bold">R$ {valorReais}</span>
        <span className="font-mono text-ink-soft mx-2">→</span>
        <span className="font-mono text-stamp">{tier.credits_awarded} CR</span>
        {bonus > 0 && (
          <span className="font-mono text-xs text-ink-soft ml-2">(+{bonus} bônus)</span>
        )}
        {!tier.active && (
          <span className="ml-2 text-xs font-mono text-warn">desativada</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={alternarAtivo}
          disabled={loading}
          className="text-xs font-mono text-ink-soft underline disabled:opacity-50"
        >
          {tier.active ? "desativar" : "ativar"}
        </button>
        <button
          onClick={remover}
          disabled={loading}
          className="text-xs font-mono text-warn underline disabled:opacity-50"
        >
          remover
        </button>
      </div>
    </div>
  );
}