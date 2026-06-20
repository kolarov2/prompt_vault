"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductAdminForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    price_credits: 10,
    cover_emoji: "📦",
    content_url: "",
  });

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function criar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      setForm({
        title: "",
        slug: "",
        description: "",
        category: "",
        price_credits: 10,
        cover_emoji: "📦",
        content_url: "",
      });
      router.refresh();
    } else {
      const json = await res.json();
      alert(json.error || "Não foi possível criar o produto.");
    }
  }

  return (
    <form onSubmit={criar} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
      <input
        required
        placeholder="título"
        value={form.title}
        onChange={(e) => set("title", e.target.value)}
        className="border border-line rounded-sm px-3 py-2"
      />
      <input
        required
        placeholder="slug (ex: prompts-reels-virais)"
        value={form.slug}
        onChange={(e) => set("slug", e.target.value)}
        className="border border-line rounded-sm px-3 py-2 font-mono"
      />
      <input
        required
        placeholder="categoria"
        value={form.category}
        onChange={(e) => set("category", e.target.value)}
        className="border border-line rounded-sm px-3 py-2"
      />
      <input
        required
        type="number"
        min={1}
        placeholder="preço em créditos"
        value={form.price_credits}
        onChange={(e) => set("price_credits", Number(e.target.value))}
        className="border border-line rounded-sm px-3 py-2 font-mono"
      />
      <input
        placeholder="emoji de capa"
        value={form.cover_emoji}
        onChange={(e) => set("cover_emoji", e.target.value)}
        className="border border-line rounded-sm px-3 py-2"
      />
      <input
        placeholder="link de entrega (download)"
        value={form.content_url}
        onChange={(e) => set("content_url", e.target.value)}
        className="border border-line rounded-sm px-3 py-2"
      />
      <textarea
        required
        placeholder="descrição"
        value={form.description}
        onChange={(e) => set("description", e.target.value)}
        rows={3}
        className="sm:col-span-2 border border-line rounded-sm px-3 py-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="sm:col-span-2 bg-signal text-white font-mono font-bold py-2 rounded-sm disabled:opacity-50"
      >
        {loading ? "criando..." : "criar produto"}
      </button>
    </form>
  );
}