export default function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="border border-line bg-white rounded-sm p-5">
      <p className="font-mono text-xs uppercase tracking-wider text-ink-soft mb-2">
        {label}
      </p>
      <p className={`font-mono font-extrabold text-2xl ${accent ? "text-signal" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}