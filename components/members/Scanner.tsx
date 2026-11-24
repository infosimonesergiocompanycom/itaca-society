"use client";

import jsQR from "jsqr";
import { useCallback, useEffect, useRef, useState } from "react";
import { checkinAction, checkinByNumberAction, type CheckinResult } from "@/app/actions";
import { cn, shortDate } from "@/lib/format";

type EventOption = { slug: string; label: string };

const REASON: Record<string, string> = {
  pending: "Domanda non ancora approvata",
  awaiting_payment: "Quota non versata",
  expired: "Tessera scaduta",
  rejected: "Domanda non accolta",
  suspended: "Tessera sospesa",
};

export function Scanner({ events, counts }: { events: EventOption[]; counts: Record<string, number> }) {
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const lastToken = useRef<{ value: string; at: number } | null>(null);
  const busy = useRef(false);
  const [eventSlug, setEventSlug] = useState(events[0]?.slug ?? "ingresso-generico");
  const [camera, setCamera] = useState<"off" | "starting" | "on" | "error">("off");
  const [result, setResult] = useState<CheckinResult | null>(null);
  const [manual, setManual] = useState("");
  const [tally, setTally] = useState(0);

  const handle = useCallback(
    async (run: () => Promise<CheckinResult>) => {
      if (busy.current) return;
      busy.current = true;
      try {
        const r = await run();
        setResult(r);
        if (r.status === "ok") setTally((t) => t + 1);
        if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(r.status === "ok" ? 80 : [60, 60, 60]);
      } finally {
        busy.current = false;
      }
    },
    [],
  );

  const start = async () => {
    setCamera("starting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
      if (video.current) {
        video.current.srcObject = stream;
        await video.current.play();
      }
      setCamera("on");
    } catch {
      setCamera("error");
    }
  };

  useEffect(() => {
    if (camera !== "on") return;
    let raf = 0;
    let last = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < 200) return;
      last = t;
      const v = video.current;
      const c = canvas.current;
      if (!v || !c || v.readyState < 2) return;
      const w = 480;
      const h = Math.round((v.videoHeight / v.videoWidth) * w) || 480;
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(v, 0, 0, w, h);
      const code = jsQR(ctx.getImageData(0, 0, w, h).data, w, h, { inversionAttempts: "dontInvert" });
      if (!code?.data) return;
      const now = Date.now();
      if (lastToken.current && lastToken.current.value === code.data && now - lastToken.current.at < 4000) return;
      lastToken.current = { value: code.data, at: now };
      void handle(() => checkinAction(code.data, eventSlug));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [camera, eventSlug, handle]);

  useEffect(() => {
    const v = video.current;
    return () => {
      const stream = v?.srcObject as MediaStream | null;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const tone =
    result?.status === "ok" ? "bg-[#3d6b4f] text-calce" : result?.status === "already" ? "bg-pesca" : result ? "bg-[#8a2f2f] text-calce" : "bg-nebbia";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <label className="block">
          <span className="text-sm font-medium">Evento</span>
          <select value={eventSlug} onChange={(e) => setEventSlug(e.target.value)} className="field">
            {events.map((e) => (
              <option key={e.slug} value={e.slug}>
                {e.label}
                {counts[e.slug] ? ` · ${counts[e.slug]} presenti` : ""}
              </option>
            ))}
          </select>
        </label>

        <div className="relative mt-5 aspect-square w-full overflow-hidden bg-carbone">
          <video ref={video} playsInline muted className={cn("h-full w-full object-cover", camera !== "on" && "hidden")} />
          {camera === "on" && <div className="pointer-events-none absolute inset-[18%] rounded-2xl border-2 border-calce/80" />}
          {camera !== "on" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center text-calce">
              <p className="text-[0.9375rem]">
                {camera === "error"
                  ? "Non riesco ad accedere alla fotocamera. Controlla i permessi del browser, oppure usa il numero di tessera."
                  : "Inquadra il QR della tessera digitale del socio."}
              </p>
              <button
                type="button"
                onClick={start}
                disabled={camera === "starting"}
                className="bg-calce px-6 py-3 text-[0.875rem] font-semibold text-carbone disabled:opacity-60"
              >
                {camera === "starting" ? "Avvio…" : "Avvia la fotocamera"}
              </button>
            </div>
          )}
          <canvas ref={canvas} className="hidden" />
        </div>

        <form
          className="mt-5 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (manual.trim()) void handle(() => checkinByNumberAction(manual, eventSlug));
          }}
        >
          <input
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            placeholder="Numero tessera, es. IS-2026-0001"
            className="field mt-0 flex-1"
            aria-label="Numero tessera"
          />
          <button type="submit" className="shrink-0 border border-carbone px-5 text-[0.8125rem] font-semibold hover:bg-carbone hover:text-calce">
            Verifica
          </button>
        </form>
      </div>

      <div aria-live="assertive">
        <div className={cn("flex min-h-[320px] flex-col justify-center p-8 transition-colors duration-300", tone)}>
          {!result && <p className="text-center text-[0.9375rem] text-tortora">Il risultato della verifica comparirà qui.</p>}
          {result?.status === "invalid" && (
            <>
              <p className="font-serif text-4xl">Tessera non riconosciuta</p>
              <p className="mt-3 text-[0.9375rem]">Il codice non appartiene a una tessera di Itaca Society.</p>
            </>
          )}
          {result && result.status !== "invalid" && (
            <>
              <p className="text-sm font-semibold uppercase tracking-wide">
                {result.status === "ok" ? "Ingresso consentito" : result.status === "already" ? "Già entrato a questo evento" : "Ingresso non consentito"}
              </p>
              <p className="mt-3 font-serif text-[2.6rem] leading-tight">{result.name}</p>
              <p className="mt-2 text-[0.9375rem]">
                Tessera {result.cardNumber ?? "—"} · nato/a nel {result.birthYear}
              </p>
              <p className="mt-1 text-[0.9375rem]">
                {result.status === "refused"
                  ? REASON[result.reason] ?? "Tessera non valida"
                  : result.paidUntil
                    ? `Valida fino al ${shortDate(result.paidUntil)}`
                    : ""}
              </p>
            </>
          )}
        </div>
        <p className="mt-4 text-sm text-tortora">Ingressi registrati in questa sessione: {tally}</p>
        <p className="mt-1 text-sm text-tortora">In caso di dubbio, chiedi un documento d&apos;identità e confronta nome e anno di nascita.</p>
      </div>
    </div>
  );
}
