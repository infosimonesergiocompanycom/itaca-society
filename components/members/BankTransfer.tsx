"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { bankTransfer } from "@/data/itacaData";

function CopyRow({ label, value, display }: { label: string; value: string; display?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* copia non disponibile: il testo resta selezionabile */
    }
  };
  return (
    <div className="flex items-start justify-between gap-3 border-b border-linea py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="text-xs text-tortora">{label}</p>
        <p className="mt-0.5 font-medium tracking-wide [overflow-wrap:anywhere] [word-break:normal]">{display ?? value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        className="mt-3 inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.06em] hover:text-terracotta"
        aria-label={`Copia ${label.toLowerCase()}`}
      >
        {copied ? <Check size={14} strokeWidth={1.5} /> : <Copy size={14} strokeWidth={1.5} />}
        {copied ? "Copiato" : "Copia"}
      </button>
    </div>
  );
}

/** Coordinate bancarie e causale precompilata per il versamento della quota. */
export function BankTransfer({ amount, reason, title = "Bonifico bancario" }: { amount: string; reason: string; title?: string }) {
  const ibanGroups = bankTransfer.iban.replace(/(.{4})/g, "$1 ").trim();
  return (
    <div className="border border-linea bg-calce p-5 text-left text-[0.9375rem]">
      <p className="text-sm font-semibold uppercase tracking-[0.06em]">{title}</p>
      <div className="mt-2">
        <div className="border-b border-linea py-3">
          <p className="text-xs text-tortora">Intestatario</p>
          <p className="mt-0.5 font-medium">
            {bankTransfer.beneficiary} · {bankTransfer.bank}
          </p>
        </div>
        <CopyRow label="IBAN" value={bankTransfer.iban} display={ibanGroups} />
        <div className="border-b border-linea py-3">
          <p className="text-xs text-tortora">Importo</p>
          <p className="mt-0.5 font-medium">{amount}</p>
        </div>
        <CopyRow label="Causale" value={reason} />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-tortora">
        Usa esattamente questa causale. La tessera si attiva quando la segreteria registra il versamento, di solito entro pochi giorni
        lavorativi.
      </p>
    </div>
  );
}
