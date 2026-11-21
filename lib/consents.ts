/**
 * Consensi facoltativi al trattamento dei dati per finalità promozionali.
 * Testi condivisi tra modulo di registrazione, Area Soci, informativa e registro dei consensi.
 * Quando un testo cambia nella sostanza, aggiornare CONSENT_VERSION: il registro conserva
 * la versione accettata da ciascun socio.
 */

export const CONSENT_VERSION = "2026-11";

export type ConsentKind = "marketing" | "sponsor";

export const consentTexts: Record<ConsentKind, { title: string; text: string }> = {
  marketing: {
    title: "Comunicazioni promozionali di Itaca Society",
    text: "Acconsento a ricevere da Itaca Society comunicazioni promozionali e informative su eventi, iniziative e attività dell'associazione, anche realizzate insieme a sponsor e partner, via email, telefono o messaggi.",
  },
  sponsor: {
    title: "Comunicazione dei dati a sponsor e partner",
    text: "Acconsento alla comunicazione dei miei dati di contatto (nome, cognome, email, telefono, comune di residenza e interessi indicati) a sponsor e partner di Itaca Society, che potranno contattarmi per proprie finalità promozionali nei settori cultura, eventi, enogastronomia, benessere e lifestyle, in qualità di autonomi titolari del trattamento.",
  },
};

export const consentNote =
  "Consensi facoltativi: puoi darli o revocarli in qualsiasi momento dalla tua Area Soci. Non incidono sull'ammissione né sui servizi dell'associazione.";
