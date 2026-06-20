"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_LABEL: Record<string, { text: string; cls: string }> = {
  solicitado: { text: "pendente", cls: "text-signal" },
  aprovado: { text: "aprovado", cls: "text-stamp" },
  negado: { text: "negado", cls: "text-warn" },
};

export default function RefundAdminRow({ order }: { order: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function resolver(decisao: "aprovado" | "negado") {
    setLoading(true);
    const res = await fetch("/api/admin/reembolso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.id, decisao }),
    });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      alert("Não foi possível registrar a decisão.");
    }
  }

  return (
    <div className="px-4 py-3 text-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl">{order.products?.cover_emoji}</span>
          <div className="min-w-0">
            <p className="font-medium truncate">{order.products?.title}</p>
            <p className="text-xs text-ink-soft font-mono truncate">
              {order.profiles?.email} · {order.price_paid_credits} CR
            </p>
            {order.refund_reason && (
              <p className="text-xs text-ink-soft mt-1 italic">"{order.refund_reason}"</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`font-mono text-xs ${STATUS_LABEL[order.refund_status].cls}`}>
            {STATUS_LABEL[order.refund_status].text}
          </span>
          {order.refund_status === "solicitado" && (
            <>
              <button
                onClick={() => resolver("aprovado")}
                disabled={loading}
                className="text-xs font-mono bg-stamp text-white px-2 py-1 rounded-sm disabled:opacity-50"
              >
                aprovar
              </button>
              <button
                onClick={() => resolver("negado")}
                disabled={loading}
                className="text-xs font-mono bg-warn text-white px-2 py-1 rounded-sm disabled:opacity-50"
              >
                negar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}