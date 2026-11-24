/**
 * Converte un link pubblico di Spotify (open.spotify.com) nell'indirizzo del lettore incorporato.
 * Restituisce null per i link che Spotify non permette di incorporare (es. profilo utente).
 */
export function spotifyEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname !== "open.spotify.com") return null;
    const parts = u.pathname.split("/").filter(Boolean).filter((p) => !p.startsWith("intl-"));
    const [type, id] = parts;
    if (!id || !["playlist", "album", "artist", "track", "show", "episode"].includes(type)) return null;
    return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`;
  } catch {
    return null;
  }
}
