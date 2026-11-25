import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { music, social } from "@/data/itacaData";
import { spotifyEmbed } from "@/lib/spotify";
import { LoopVideo } from "@/components/home/Editorial";

export const metadata: Metadata = {
  title: "Musica",
  description: "Le playlist di Itaca Society: ascolti integrali, DJ set organici e la musica delle nostre serate in Versilia.",
};

const btn =
  "inline-block border border-carbone/40 px-6 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300 hover:border-carbone hover:bg-carbone hover:text-calce";

export default function MusicPage() {
  const players = music.spotify.map((p) => ({ ...p, embed: spotifyEmbed(p.url) }));
  return (
    <>
      <section className="px-5 pb-16 pt-32 text-center sm:px-16 sm:pb-24 sm:pt-40">
        <p className="eyebrow">Le Fasi di Itaca · Musica</p>
        <h1 className="mx-auto mt-6 max-w-3xl text-[2.6rem] leading-[1.02] sm:text-[4rem]">Il suono delle nostre sere</h1>
        <p className="mx-auto mt-8 max-w-xl font-serif text-[1.1rem] leading-snug">
          Dischi ascoltati per intero, dal primo all&apos;ultimo solco. DJ set organici che accompagnano il tramonto e la notte. Le playlist
          raccolgono la musica che ha attraversato i nostri incontri.
        </p>
      </section>

      <section className="px-5 pb-24 sm:px-16 sm:pb-32">
        {players.length > 0 ? (
          <div className="grid gap-10 lg:grid-cols-2">
            {players.map((p) => (
              <div key={p.url}>
                <p className="eyebrow">{p.title}</p>
                {p.note && <p className="mt-2 text-[0.9rem] text-tortora">{p.note}</p>}
                {p.embed ? (
                  <iframe
                    title={`Spotify: ${p.title}`}
                    src={p.embed}
                    className="mt-5 h-[380px] w-full border-0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                ) : (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={`${btn} mt-5`}>
                    Ascolta su Spotify
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl border-y border-linea py-14 text-center">
            {music.spotifyProfile ? (
              <>
                <p className="font-serif text-[1.6rem] italic leading-snug sm:text-[2rem]">Le playlist di Itaca sono su Spotify.</p>
                <p className="mt-4 text-[0.95rem] text-tortora">Segui il profilo per ascoltare la musica delle nostre serate e ricevere le nuove selezioni.</p>
                <a href={music.spotifyProfile} target="_blank" rel="noopener noreferrer" className={`${btn} mt-8`}>
                  Itaca Society su Spotify
                </a>
              </>
            ) : (
              <>
                <p className="font-serif text-[1.6rem] italic leading-snug sm:text-[2rem]">Le playlist di Itaca arrivano a breve.</p>
                <p className="mt-4 text-[0.95rem] text-tortora">Nel frattempo, la musica delle serate passa anche dal nostro profilo Instagram.</p>
                <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" className={`${btn} mt-8`}>
                  Instagram @{social.instagram.handle}
                </a>
              </>
            )}
          </div>
        )}
        {music.spotifyProfile && players.length > 0 && (
          <p className="mt-12 text-center">
            <a href={music.spotifyProfile} target="_blank" rel="noopener noreferrer" className={btn}>
              Segui Itaca Society su Spotify
            </a>
          </p>
        )}
      </section>

      {music.resident && (
        <section className="px-5 pb-24 text-center sm:px-16 sm:pb-32">
          <p className="eyebrow">{music.resident.role}</p>
          {music.resident.logo ? (
            <h2 className="mt-10">
              <Image src={music.resident.logo} alt={music.resident.name} width={900} height={771} className="mx-auto h-auto w-[220px] sm:w-[260px]" />
            </h2>
          ) : (
            <h2 className="mt-6 text-[2.6rem] leading-none sm:text-[3.6rem]">{music.resident.name}</h2>
          )}
          <p className="mx-auto mt-10 max-w-lg font-serif text-[1.05rem] leading-snug">
            {music.resident.name} è la voce musicale di Itaca Society: firma i set delle nostre serate, dal tramonto fino a tardi.
          </p>
        </section>
      )}

      <section className="grid gap-2.5 px-5 pb-24 sm:grid-cols-3 sm:px-16 sm:pb-32">
        {[
          { n: 1, label: "Pista piena sotto le luci, una serata di Itaca Society" },
          { n: 2, label: "Luci rosse e blu sopra la consolle durante il DJ set" },
          { n: 3, label: "Braccia alzate sotto l'insegna al neon, una serata di Itaca Society" },
        ].map((v) => (
          <div key={v.n} className="relative aspect-[3/4] overflow-hidden bg-carbone">
            <LoopVideo src={`/video/musica-${v.n}.mp4`} poster={`/video/musica-${v.n}.jpg`} label={v.label} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        ))}
      </section>

      <section className="px-5 pb-24 text-center sm:px-16 sm:pb-32">
        <h2 className="mx-auto max-w-2xl text-[2rem] leading-[1.05] sm:text-[2.8rem]">Ogni ascolto è un incontro</h2>
        <p className="mx-auto mt-6 max-w-lg font-serif text-[1.05rem] leading-snug">
          Gli ascolti integrali e le serate musicali fanno parte de Le Fasi di Itaca e sono riservati ai soci.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/eventi" className={btn}>
            Il calendario
          </Link>
          <Link href="/diventa-socio" className="inline-block bg-carbone px-6 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-calce hover:bg-terracotta">
            Diventa socio
          </Link>
        </div>
      </section>
    </>
  );
}
