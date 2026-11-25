/* -------------------------------------------------------------------------- */
/*  ITACA SOCIETY — contenuti editoriali                                       */
/*  Fonte: Brand Book Itaca Society (Pietrasanta · Versilia, agosto 2026).     */
/*  Unica fonte di verità per testi, formati, eventi, tesseramento e journal.  */
/* -------------------------------------------------------------------------- */

/** URL Unsplash ottimizzato (immagini di supporto, scelte secondo la direzione fotografica). */
export const unsplash = (id: string, width = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

/** Fotografie di Itaca Society (public/foto), dagli originali della prima edizione del Festival. */
export const brandPhotos = {
  mareScogli: "/foto/mare-tramonto.jpg",
  tamburo: "/foto/dj-giardino.jpg",
  ritratto: "/foto/talk-giardino.jpg",
  fuoco: "/foto/fuoco-tramonto.jpg",
  cappello: "/foto/cappello-piscina.jpg",
  piatto: "/foto/tavola-apparecchiata.jpg",
  ombra: "/foto/sorriso-tramonto.jpg",
  // Altri scatti originali della prima edizione dell'Itaca Society Festival
  insegna: "/foto/insegna-itaca.jpg",
  conversazione: "/foto/conversazione-tramonto.jpg",
  spiaggia: "/foto/spiaggia-tramonto.jpg",
  controluce: "/foto/controluce.jpg",
  yoga: "/foto/yoga-giardino.jpg",
  acquerelli: "/foto/acquerelli.jpg",
  calligrafia: "/foto/calligrafia.jpg",
  amiche: "/foto/amiche-tramonto.jpg",
  sax: "/foto/sax-giardino.jpg",
  console: "/foto/console-dj.jpg",
  djTramonto: "/foto/dj-tramonto.jpg",
  // Seconda selezione: Cala Marella opening e scatti di stagione
  scoglio: "/foto/scoglio-mare.jpg",
  aranciaMare: "/foto/arancio-mare.jpg",
  cappelloBn: "/foto/cappello-bn.jpg",
  sandali: "/foto/sandali-pontile.jpg",
  battigia: "/foto/passi-battigia.jpg",
  portico: "/foto/portico-statua.jpg",
  colonne: "/foto/colonne-cielo.jpg",
  djNotte: "/foto/dj-notte.jpg",
  mani: "/foto/mani-intrecciate.jpg",
  luceOmbra: "/foto/luce-ombra.jpg",
  fuocoDanza: "/foto/fuoco-danza.jpg",
  fuocoSpirale: "/foto/fuoco-spirale.jpg",
  riposo: "/foto/riposo.jpg",
  piediPontile: "/foto/piedi-pontile.jpg",
  vialePalme: "/foto/viale-palme.jpg",
  acqua: "/foto/acqua.jpg",
  soleIntreccio: "/foto/sole-intreccio.jpg",
  palma: "/foto/palma.jpg",
  talk: "/foto/talk-festival.jpg",
  convivio: "/foto/convivio-tavola.jpg",
  palmeControluce: "/foto/palme-controluce.jpg",
  soleFestival: "/foto/sole-festival.jpg",
  // Il Banchetto di Itaca, prima edizione al Panama by Borsalino
  banchettoInsegna: "/foto/banchetto-insegna.jpg",
  banchettoRosso: "/foto/banchetto-rosso.jpg",
  banchettoBallo: "/foto/banchetto-ballo.jpg",
  banchettoConsole: "/foto/banchetto-console.jpg",
  banchettoPiscina: "/foto/banchetto-piscina.jpg",
  banchettoTavola: "/foto/banchetto-tavola.jpg",
} as const;

/** Immagini di supporto: luoghi del territorio (public/foto, Wikimedia Commons) e fotografie Unsplash ad alta risoluzione. */
export const photos = {
  ...brandPhotos,
  // Territorio: Apuane, cave, Marina di Pietrasanta, Forte dei Marmi (crediti in /crediti)
  procintoAlba: "/foto/alba-procinto.jpg",
  procinto: "/foto/natura-procinto.jpg",
  procintoVetta: "/foto/cammini-procinto.jpg",
  monteForato: "/foto/monte-forato.jpg",
  marmoCave: "/foto/marmo-cave.jpg",
  marmoParete: "/foto/marmo-parete.jpg",
  marinaTramonto: "/foto/marina-tramonto.jpg",
  marinaOnde: "/foto/marina-onde.jpg",
  pontile: "/foto/pontile-forte.jpg",
  // Temi
  giradischi: unsplash("1458560871784-56d23406c091", 2400),
  vinile: unsplash("1603048588665-791ca8aea617", 2400),
  biblioteca: unsplash("1481627834876-b7833e8f5570", 2400),
  lettura: unsplash("1532012197267-da84d127e765", 2400),
  poesia: unsplash("1474932430478-367dbb6832c1", 2400),
  pellicola: unsplash("1440404653325-ab127d49abc1", 2400),
  campana: unsplash("1593811167562-9cef47bfc4d7", 2400),
  tornio: unsplash("1493106641515-6b5631de4bb9", 2400),
  vasi: unsplash("1565193566173-7a0ee3dbe261", 2400),
  tavolaLunga: unsplash("1528605248644-14dd04022da1", 2400),
  brindisi: unsplash("1519671482749-fd09be7ccebf", 2400),
  vignaCalice: unsplash("1506377247377-2a5b3b417ebb", 2400),
} as const;

/**
 * Video di sfondo della copertina in homepage (trailer). Lasciare `null` per la copertina ink senza video.
 * File attesi in public/video: trailer.mp4 (H.264), trailer.webm (facoltativo), trailer-poster.jpg.
 */
export const introVideo: { mp4: string; webm?: string; poster: string } | null = {
  mp4: "/video/trailer.mp4",
  webm: "/video/trailer.webm",
  poster: "/video/trailer-poster.jpg",
};

/** Presentazione del club in homepage. */
export const clubIntro = {
  text: "Itaca Society è un circolo culturale per soci di nuova generazione, nato a Pietrasanta per una comunità curiosa, colta e in movimento. Accogliamo con la cura di una casa antica, crediamo nella convivialità come forma di cultura e custodiamo con riservatezza ciò che accade tra i nostri soci. Il nostro approccio è misurato: mettiamo in dialogo musica, arte, benessere e conoscenza, e diamo spazio a sguardi diversi e personali. Itaca Society sfugge alle definizioni, segue un proprio ritmo e risveglia in ognuno il desiderio di partire, e quello di ritrovarsi.",
  quote: "Itaca Society crea le premesse per incontri che valgono il viaggio.",
  vision:
    "Una nuova generazione di circolo culturale per soci, radicato in Versilia e aperto al mondo: un luogo in cui bellezza, armonia e conoscenza tornano a essere un'esperienza condivisa, e in cui ogni incontro diventa parte di un viaggio comune.",
};

/** Profili social ufficiali. */
export const social = {
  instagram: { handle: "itaca_society", url: "https://www.instagram.com/itaca_society/" },
  spotify: { url: "https://open.spotify.com/user/31tq65mu6jbbgisoebjez7ahm2ym" },
};

/**
 * Musica: link pubblici di Spotify (open.spotify.com), mostrati nella pagina /musica.
 * Basta incollare l'indirizzo che Spotify dà con «Condividi → Copia link»: playlist, album, artista o brano
 * diventano lettori incorporati; il profilo utente diventa un pulsante.
 */
export const music: {
  spotifyProfile: string | null;
  resident: { name: string; role: string; logo?: string } | null;
  spotify: { title: string; url: string; note?: string }[];
} = {
  spotifyProfile: "https://open.spotify.com/user/31tq65mu6jbbgisoebjez7ahm2ym",
  resident: { name: "Seirios", role: "DJ resident", logo: "/loghi/seirios.png" },
  spotify: [],
};

/* -------------------------------------------------------------------------- */
/*  Identità                                                                   */
/* -------------------------------------------------------------------------- */

export const brand = {
  tagline: "Live the journey",
  claim: "Comunità · Cultura · Versilia",
  mission:
    "Realizzare esperienze ed eventi immersivi, formativi e culturali che diffondano gli ideali classici di bellezza, armonia, virtù e conoscenza, favorendo la connessione tra persone.",
  missionLong:
    "Creare una comunità ispirata ai grandi ideali classici, dove ogni individuo compia un viaggio autentico di conoscenza e crescita personale, riscoprendo bellezza e armonia per un'esistenza più consapevole.",
  positioning: "Offriamo esperienze di benessere, arte e cultura, per chi crede che ogni viaggio sia un ritorno a sé stesso.",
};

export const kavafis = {
  opening:
    "Quando ti metterai in viaggio per Itaca, augurati che sia lunga la strada, piena di avventure, piena di conoscenze.",
  closing: "Itaca ti ha dato il bellissimo viaggio. Senza di lei non ti saresti messo in cammino.",
  wisdom:
    "Saggio come sei diventato, con tanta esperienza, avrai capito ormai che cosa significano le Itache.",
  source: "Costantino Kavafis, Itaca (1911)",
};

export const manifesto = {
  eyebrow: "Il nome, il viaggio, il ritorno",
  title: "Il valore sta nel cammino.",
  paragraphs: [
    "Il nome «Itaca» arriva da due fonti che si rispondono. La prima è l'Odissea di Omero, dove il viaggio di Ulisse verso casa è metafora della ricerca di sé. La seconda è la poesia Itaca di Konstantinos Kavafis, che ribalta il mito: conta il cammino, con le esperienze vissute, le conoscenze acquisite e i legami costruiti lungo la strada.",
    "Itaca Society propone un attraversamento di bellezza, di cultura e di relazioni, che ciascuno compie a modo proprio e da cui torna, come Ulisse, un po' diverso da come è partito.",
    "Il fondamento è classico senza nostalgia: la bellezza greca come misura, la cittadinanza e il diritto romani come struttura di appartenenza, l'Umanesimo come centralità dell'uomo e della conoscenza. Tre strati di civiltà mediterranea che si sovrappongono, come a Pietrasanta, la «piccola Atene» della Versilia, città di marmo, scultura e cultura diffusa.",
  ],
  signature: "Itaca Society, Pietrasanta",
};

/** I sette ideali e il comportamento concreto in cui ciascuno si traduce. */
export const values: { name: string; idea: string; practice: string }[] = [
  {
    name: "Bellezza",
    idea: "Ricerca del bello come verità ed equilibrio, estetica ed etica insieme.",
    practice: "Cura scenografica di ogni luogo, nessun elemento commerciale invasivo.",
  },
  {
    name: "Armonia",
    idea: "Equilibrio tra corpo, mente e spirito, tra individuo e comunità.",
    practice: "Programmi che alternano intensità e pausa, musica e silenzio.",
  },
  {
    name: "Virtù",
    idea: "Forza morale, coraggio, rettitudine.",
    practice: "Partner, fornitori e contenuti sempre coerenti con ciò che siamo.",
  },
  {
    name: "Conoscenza",
    idea: "Sete di sapere, ricerca della verità.",
    practice: "Talk e momenti culturali sempre presenti, mai di riempimento.",
  },
  {
    name: "Giustizia",
    idea: "Equilibrio tra diritti e doveri, individuo e società.",
    practice: "Un patto chiaro con il territorio e le sue istituzioni.",
  },
  {
    name: "Libertà",
    idea: "Autonomia vissuta con responsabilità.",
    practice: "Formati che invitano: programmi aperti, spazio per l'esperienza di ciascuno.",
  },
  {
    name: "Bene comune",
    idea: "Agire per il benessere collettivo, oltre l'interesse proprio.",
    practice: "Parte del valore resta al territorio: artigianato locale, filiere corte.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Navigazione                                                               */
/* -------------------------------------------------------------------------- */

export type NavLink = { label: string; href: string };

export const drawerLinks: (NavLink & { note: string })[] = [
  { label: "Il Club", href: "/il-club", note: "Il nome, la missione, i sette ideali" },
  { label: "Formati", href: "/formati", note: "Le Fasi, il Banchetto, il Festival" },
  { label: "Eventi", href: "/eventi", note: "Il calendario de Le Fasi di Itaca" },
  { label: "Diventa socio", href: "/diventa-socio", note: "Tessera associativa, 10 € l'anno" },
  { label: "Musica", href: "/musica", note: "Le playlist e i DJ set di Itaca" },
  { label: "Area Soci", href: "/area-soci", note: "La tua tessera digitale" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Società",
    links: [
      { label: "Il Club", href: "/il-club" },
      { label: "Tesseramento", href: "/membership" },
      { label: "Diventa socio", href: "/diventa-socio" },
      { label: "Musica", href: "/musica" },
    ],
  },
  {
    title: "Formati",
    links: [
      { label: "Le Fasi di Itaca", href: "/formati/le-fasi-di-itaca" },
      { label: "Il Banchetto di Itaca", href: "/formati/il-banchetto-di-itaca" },
      { label: "Itaca Society Festival", href: "/formati/festival" },
    ],
  },
  {
    title: "Il Club",
    links: [
      { label: "Il patto tra soci", href: "/regole" },
      { label: "Statuto", href: "/statuto" },
      { label: "Eventi", href: "/eventi" },
      { label: "Area Soci", href: "/area-soci" },
    ],
  },
  {
    title: "Contatti",
    links: [
      { label: "Scrivici", href: "/contatti" },
      { label: "Instagram", href: "https://www.instagram.com/itaca_society/" },
      { label: "Spotify", href: "https://open.spotify.com/user/31tq65mu6jbbgisoebjez7ahm2ym" },
      { label: "Privacy", href: "/privacy" },
      { label: "Crediti fotografici", href: "/crediti" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Icone                                                                      */
/* -------------------------------------------------------------------------- */

export type IconKey =
  | "headphones"
  | "utensils"
  | "leaf"
  | "palette"
  | "wine"
  | "sunset"
  | "bed"
  | "library"
  | "footprints"
  | "flame"
  | "droplets"
  | "sprout"
  | "anchor"
  | "compass"
  | "key"
  | "film"
  | "coffee"
  | "trees"
  | "landmark"
  | "plane"
  | "sun"
  | "armchair"
  | "disc"
  | "calendar"
  | "users"
  | "mountain"
  | "sailboat";

export type Highlight = { icon: IconKey; label: string };

/* -------------------------------------------------------------------------- */
/*  Formati (architettura di marca)                                            */
/* -------------------------------------------------------------------------- */

export type FormatStatus = "attivo" | "in arrivo" | "orizzonte";

export type Format = {
  slug: string;
  name: string;
  alias?: string;
  role: string;
  status: FormatStatus;
  tagline: string;
  summary: string;
  card: string;
  strip: string[];
  statement: string;
  body: string;
  highlights: Highlight[];
  features: { title: string; text: string; image: string; href?: string }[];
  block: { title: string; text: string; image: string };
  info: { label: string; value: string }[];
  about: string;
};

export const formats: Format[] = [
  {
    slug: "le-fasi-di-itaca",
    name: "Le Fasi di Itaca",
    role: "Fidelizzazione",
    status: "attivo",
    tagline: "Un calendario che segue la luna: talk, mostre, cene, pratiche di benessere.",
    summary: "Calendario ricorrente di eventi minori, scandito come cicli lunari: tiene viva la community tra un Banchetto e un Festival.",
    card: brandPhotos.acquerelli,
    strip: [brandPhotos.ritratto, brandPhotos.cappelloBn, brandPhotos.djNotte, brandPhotos.portico, brandPhotos.ombra, brandPhotos.battigia, brandPhotos.riposo, brandPhotos.mani],
    statement:
      "Un appuntamento per ogni fase: incontri piccoli e ricorrenti che tengono viva la comunità durante tutto l'anno",
    body: "Le Fasi di Itaca sono il calendario dei soci: talk, mostre, cene e pratiche di benessere, distribuiti nel mese come cicli lunari. Ogni incontro porta un nome nella forma «Le Fasi di Itaca — tema».",
    highlights: [
      { icon: "library", label: "Talk" },
      { icon: "palette", label: "Mostre" },
      { icon: "utensils", label: "Cene" },
      { icon: "leaf", label: "Benessere" },
      { icon: "headphones", label: "Ascolti" },
      { icon: "calendar", label: "Cadenza ricorrente" },
      { icon: "users", label: "Riservate ai soci" },
      { icon: "landmark", label: "Pietrasanta e Versilia" },
    ],
    features: [
      {
        title: "Talk e conoscenza",
        text: "Incontri a numero chiuso su filosofia, arte e cinema: momenti culturali sempre presenti, mai decorativi.",
        image: brandPhotos.talk,
      },
      {
        title: "Pratiche e cammini",
        text: "Mattine di respiro e cammino tra il mare della Versilia e i sentieri delle Apuane.",
        image: brandPhotos.battigia,
      },
    ],
    block: {
      title: "Come partecipare",
      text: "Le Fasi sono riservate ai soci: con la tessera associativa ti iscrivi al calendario e mostri il QR all'ingresso di ogni incontro.",
      image: brandPhotos.sandali,
    },
    info: [
      { label: "Formato", value: "Calendario ricorrente di eventi minori" },
      { label: "Stato", value: "In arrivo: il primo ciclo apre nell'inverno 2026" },
      { label: "Accesso", value: "Con tessera associativa" },
    ],
    about:
      "Le Fasi di Itaca sono il formato di fidelizzazione di Itaca Society: un calendario ricorrente di talk, mostre, cene e pratiche di benessere, scandito come cicli lunari.",
  },
  {
    slug: "il-banchetto-di-itaca",
    name: "Il Banchetto di Itaca",
    alias: "Symposion",
    role: "Esperienza apicale",
    status: "attivo",
    tagline: "Un rito prima che un evento: il fuoco, il vino, la tavola condivisa.",
    summary: "Evento serale in formato banchetto: ospiti selezionati, cura massima, il brand nella sua versione più pura.",
    card: brandPhotos.banchettoInsegna,
    strip: [brandPhotos.banchettoTavola, brandPhotos.banchettoInsegna, brandPhotos.banchettoConsole, brandPhotos.banchettoBallo, brandPhotos.banchettoPiscina, brandPhotos.banchettoRosso],
    statement:
      "Il cuore della community: una sera in tre atti, una tavola unica, ospiti selezionati e la cura di ogni dettaglio",
    body: "Il Banchetto di Itaca reinterpreta il simposio greco-romano nella Versilia di oggi. Si comincia con l'accoglienza, si siede alla stessa tavola, si resta per la musica. È il luogo dove i valori dell'associazione diventano messa in scena concreta.",
    highlights: [
      { icon: "wine", label: "Aperitivo" },
      { icon: "utensils", label: "Convivium" },
      { icon: "disc", label: "Symposion" },
      { icon: "flame", label: "Fuoco, danza, magia" },
      { icon: "users", label: "Ospiti selezionati" },
      { icon: "sunset", label: "Dalle 19:00 alle 00:30" },
      { icon: "key", label: "Su invito e per i soci" },
      { icon: "landmark", label: "Versilia" },
    ],
    features: [
      {
        title: "Convivium",
        text: "La cena a tavola lunga, un unico tavolo che attraversa lo spazio. Tra una portata e l'altra, tre interventi performativi: fuoco, danza, magia.",
        image: brandPhotos.banchettoTavola,
      },
      {
        title: "Symposion",
        text: "Dopo la cena la sera cambia registro: la tavola lascia spazio al club, con un DJ set organico fino a tardi.",
        image: brandPhotos.banchettoBallo,
      },
    ],
    block: {
      title: "La prima edizione",
      text: "24 luglio 2026, Panama by Borsalino. Lo spazio trasformato in banchetto romano-greco: illuminazione scenica perimetrale, un tavolo unico che lo attraversa da un capo all'altro, bracieri e coppe in stile kylix.",
      image: brandPhotos.banchettoRosso,
    },
    info: [
      { label: "Formato", value: "Evento serale in tre atti: Aperitivo, Convivium, Symposion" },
      { label: "Prima edizione", value: "24 luglio 2026 · Panama by Borsalino" },
      { label: "Accesso", value: "Su invito e per i soci, a posti limitati" },
    ],
    about:
      "Il Banchetto di Itaca è l'esperienza apicale di Itaca Society: un evento serale in formato banchetto che consacra la community. Ogni edizione è una dimostrazione, non una prova generale.",
  },
  {
    slug: "festival",
    name: "Itaca Society Festival",
    role: "Porta d'ingresso",
    status: "attivo",
    tagline: "La giornata del benessere, la sera del club: il primo incontro con Itaca.",
    summary: "Formato pubblico a doppia location, con ticket accessibile: il primo incontro con il brand per un pubblico ampio.",
    card: brandPhotos.soleFestival,
    strip: [brandPhotos.cappello, brandPhotos.mareScogli, brandPhotos.aranciaMare, brandPhotos.tamburo, brandPhotos.acqua, brandPhotos.vialePalme, brandPhotos.ritratto, brandPhotos.soleIntreccio],
    statement:
      "Una giornata in due tempi: di giorno benessere, workshop e arte, la sera musica e club, in due luoghi diversi",
    body: "Il Festival è la porta d'ingresso a Itaca Society: un formato aperto, con un ticket accessibile, pensato per chi incontra il brand per la prima volta. Da qui si arriva alla community e alle esperienze riservate ai soci.",
    highlights: [
      { icon: "sun", label: "Benessere di giorno" },
      { icon: "disc", label: "Club di sera" },
      { icon: "headphones", label: "Ambient, elettronica soft, world" },
      { icon: "palette", label: "Arte e installazioni" },
      { icon: "leaf", label: "Workshop e pratiche" },
      { icon: "utensils", label: "Food & beverage curati" },
      { icon: "landmark", label: "Doppia location" },
      { icon: "users", label: "Aperto al pubblico" },
    ],
    features: [
      {
        title: "Il giorno",
        text: "Pratiche di benessere, workshop e installazioni immersive, con una selezione musicale che accompagna senza imporsi.",
        image: brandPhotos.mareScogli,
      },
      {
        title: "La sera",
        text: "Il club: musica selezionata tra ambient, elettronica soft e world music, e stand food & beverage curati.",
        image: brandPhotos.djNotte,
      },
    ],
    block: {
      title: "Ritmo",
      text: "Il programma alterna intensità e pausa, musica e silenzio, socialità e raccoglimento. Mai un unico registro per l'intera durata: è l'armonia, uno dei sette ideali, tradotta in calendario.",
      image: brandPhotos.cappello,
    },
    info: [
      { label: "Formato", value: "Evento pubblico a doppia location: giorno/wellness e sera/club" },
      { label: "Accesso", value: "Ticket accessibile, aperto a tutti" },
      { label: "Soci", value: "Condizioni dedicate ai titolari di tessera" },
    ],
    about:
      "L'Itaca Society Festival allarga la comunità: è il formato pubblico del brand, a doppia location, con musica, arte, benessere e cucina curata.",
  },
];

export const formatStatusLabel: Record<FormatStatus, string> = {
  attivo: "Attivo",
  "in arrivo": "In arrivo",
  orizzonte: "Prossimamente",
};

/** Il patto tra soci: regole di partecipazione, coerenti con i sette ideali. */
export const houseRules: { title: string; text: string }[] = [
  {
    title: "Presenza",
    text: "Durante gli incontri il telefono resta in tasca. Si fotografa con misura e mai le altre persone senza il loro consenso.",
  },
  {
    title: "Rispetto dei luoghi",
    text: "Ogni luogo che ci ospita va restituito com'era, o migliore. Cura degli spazi e di chi lavora per noi.",
  },
  {
    title: "Nessun titolo",
    text: "A Itaca ci si presenta con il proprio nome. Ruolo, lavoro e patrimonio restano fuori dalla porta.",
  },
  {
    title: "Ospiti",
    text: "Dove previsto, ogni socio accompagna i propri ospiti e ne risponde. Gli ospiti sono benvenuti, la comunità resta dei soci.",
  },
  {
    title: "Tessera personale",
    text: "La tessera digitale è nominativa e non si cede. All'ingresso può essere chiesto un documento.",
  },
  {
    title: "Lentezza",
    text: "Il tempo è parte dell'esperienza. Nessuno ha fretta: la conversazione decide quando la sera è finita.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Eventi — Le Fasi di Itaca (calendario dimostrativo, da sostituire)        */
/* -------------------------------------------------------------------------- */

export const eventCategories = ["Tutti", "Le Fasi di Itaca", "Musica & Listening", "Talk & Filosofia", "Arte & Design", "Wellness"] as const;

export type EventCategory = Exclude<(typeof eventCategories)[number], "Tutti">;

export type ItacaEvent = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  time: string;
  place: string;
  room: string;
  category: EventCategory;
  image: string;
  excerpt: string;
  seats: number;
  /** true = evento in preparazione: non compare sul sito finché non viene tolto. */
  bozza?: boolean;
};

/**
 * Intestazione della pagina Eventi. Aggiornarla a ogni nuova stagione.
 * Gli eventi si aggiungono all'elenco `events` qui sotto: quelli con data passata spariscono da soli,
 * quelli con `bozza: true` restano nascosti finché non si toglie il segno.
 */
export const calendar = {
  eyebrow: "Le Fasi di Itaca",
  title: "Il calendario d'inverno",
  intro:
    "Gli appuntamenti de Le Fasi di Itaca, tra Pietrasanta, il mare e le Apuane. Sono a numero chiuso e riservati ai soci: all'ingresso basta mostrare la tessera digitale.",
};

/** Eventi pubblicati, dal più vicino; con `today` (aaaa-mm-gg) solo quelli da oggi in poi. */
export function publishedEvents(today?: string): ItacaEvent[] {
  return events
    .filter((e) => !e.bozza && (!today || e.date >= today))
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
}

export const events: ItacaEvent[] = [
  {
    slug: "itaca-house",
    title: "Itaca House",
    date: "2026-12-20",
    time: "orario in arrivo",
    place: "Versilia",
    room: "luogo comunicato ai soci",
    category: "Le Fasi di Itaca",
    image: brandPhotos.colonne,
    excerpt: "Il prossimo appuntamento de Le Fasi di Itaca. Programma, luogo e orari saranno comunicati ai soci nei prossimi giorni.",
    seats: 40,
  },
  /* Esempi di calendario: restano come bozze (non visibili) e si possono riusare cambiando date e testi. */
  {
    slug: "fasi-ascolto-integrale",
    title: "Le Fasi di Itaca — Ascolto",
    date: "2026-11-21",
    time: "21:00",
    place: "Pietrasanta",
    room: "Luogo comunicato ai soci",
    category: "Musica & Listening",
    image: photos.giradischi,
    excerpt: "Un disco ascoltato per intero, dal primo all'ultimo solco, con le luci basse e i telefoni lasciati all'ingresso.",
    bozza: true,
    seats: 24,
  },
  {
    slug: "fasi-tempo-lento",
    title: "Le Fasi di Itaca — Il tempo",
    date: "2026-11-26",
    time: "19:00",
    place: "Pietrasanta",
    room: "Luogo comunicato ai soci",
    category: "Talk & Filosofia",
    image: photos.lettura,
    excerpt: "Una conversazione su Seneca e sulla brevità della vita, seguita da una cena alla stessa tavola.",
    bozza: true,
    seats: 30,
  },
  {
    slug: "fasi-marmo",
    title: "Le Fasi di Itaca — Il marmo",
    date: "2026-11-29",
    time: "10:30",
    place: "Pietrasanta",
    room: "Ritrovo in Piazza del Duomo",
    category: "Arte & Design",
    image: photos.marmoParete,
    excerpt: "Una mattina tra laboratori di scultura e fonderie artistiche, con chi lavora la pietra da generazioni.",
    bozza: true,
    seats: 16,
  },
  {
    slug: "fasi-fuoco-inverno",
    title: "Le Fasi di Itaca — Il fuoco",
    date: "2026-12-04",
    time: "17:30",
    place: "Marina di Pietrasanta",
    room: "Sulla spiaggia",
    category: "Musica & Listening",
    image: brandPhotos.fuoco,
    excerpt: "Il tramonto d'inverno sul mare, un braciere acceso e percussioni dal vivo, fino al buio.",
    bozza: true,
    seats: 60,
  },
  {
    slug: "fasi-alba",
    title: "Le Fasi di Itaca — L'alba",
    date: "2026-12-06",
    time: "06:45",
    place: "Alpi Apuane",
    room: "Partenza da Stazzema",
    category: "Wellness",
    image: photos.procintoAlba,
    excerpt: "Tre ore di cammino con una guida, colazione in quota e respirazione guidata davanti alla valle.",
    bozza: true,
    seats: 12,
  },
  {
    slug: "fasi-cinema",
    title: "Le Fasi di Itaca — Viaggio in Italia",
    date: "2026-12-10",
    time: "20:30",
    place: "Pietrasanta",
    room: "Luogo comunicato ai soci",
    category: "Talk & Filosofia",
    image: photos.pellicola,
    excerpt: "Proiezione del film di Roberto Rossellini del 1954, introdotta da un critico e seguita da un bicchiere insieme.",
    bozza: true,
    seats: 40,
  },
  {
    slug: "fasi-argilla",
    title: "Le Fasi di Itaca — L'argilla",
    date: "2026-12-13",
    time: "15:00",
    place: "Pietrasanta",
    room: "Bottega ceramica",
    category: "Arte & Design",
    image: photos.tornio,
    excerpt: "Un pomeriggio al tornio con una ceramista del territorio. I pezzi vengono cotti e consegnati dopo due settimane.",
    bozza: true,
    seats: 10,
  },
  {
    slug: "fasi-tavola-solstizio",
    title: "Le Fasi di Itaca — La tavola d'inverno",
    date: "2026-12-19",
    time: "20:00",
    place: "Versilia",
    room: "Luogo comunicato ai soci",
    category: "Musica & Listening",
    image: brandPhotos.piatto,
    excerpt: "Una cena a tavola lunga per salutare l'anno, con un trio acustico tra una portata e l'altra.",
    bozza: true,
    seats: 40,
  },
  {
    slug: "fasi-silenzio",
    title: "Le Fasi di Itaca — Il silenzio",
    date: "2027-01-10",
    time: "09:00",
    place: "Alpi Apuane",
    room: "Rifugio",
    category: "Wellness",
    image: photos.monteForato,
    excerpt: "Cammino, meditazione e un pranzo consumato in silenzio. Alla sera, il cerchio della parola accanto al fuoco.",
    bozza: true,
    seats: 14,
  },
  {
    slug: "fasi-kavafis",
    title: "Le Fasi di Itaca — Kavafis",
    date: "2027-01-15",
    time: "19:30",
    place: "Pietrasanta",
    room: "Luogo comunicato ai soci",
    category: "Talk & Filosofia",
    image: photos.calligrafia,
    excerpt: "Letture ad alta voce delle poesie del viaggio, accompagnate dal violoncello.",
    bozza: true,
    seats: 36,
  },
  {
    slug: "fasi-mare-inverno",
    title: "Le Fasi di Itaca — Il mare d'inverno",
    date: "2027-01-30",
    time: "08:30",
    place: "Marina di Pietrasanta",
    room: "Sulla spiaggia",
    category: "Wellness",
    image: brandPhotos.mareScogli,
    excerpt: "Respiro, bagno freddo e colazione calda: il mare della Versilia nella sua stagione più silenziosa.",
    bozza: true,
    seats: 16,
  },
];

/* -------------------------------------------------------------------------- */
/*  Tesseramento                                                              */
/* -------------------------------------------------------------------------- */

export const membershipFee = "10 €";

/** Coordinate per il versamento della quota con bonifico (dati pubblici destinati ai soci). */
export const bankTransfer = {
  beneficiary: "Itaca Society",
  bank: "Intesa Sanpaolo",
  iban: "IT66R0306909606100000417186",
};

export const admission = [
  {
    step: "1",
    title: "Registrati",
    text: "Compila la domanda di ammissione con i tuoi dati anagrafici e crea il tuo account. Servono pochi minuti.",
  },
  {
    step: "2",
    title: "Approvazione",
    text: "Il Consiglio Direttivo esamina la domanda, come previsto dallo statuto. Puoi seguirne lo stato dalla tua Area Soci.",
  },
  {
    step: "3",
    title: "Versa la quota",
    text: "Una volta approvata la domanda, versi la quota associativa di 10 € con bonifico bancario o con carta, seguendo le indicazioni nella tua Area Soci.",
  },
  {
    step: "4",
    title: "Ricevi la tessera",
    text: "La tessera digitale si attiva subito e vale dodici mesi. Mostrala all'ingresso di ogni evento.",
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Quanto costa associarsi?",
    a: "La quota associativa è di 10 € l'anno e dà accesso alle attività riservate ai soci, a partire da Le Fasi di Itaca. Alcuni eventi, come il Banchetto, possono prevedere un contributo a parte, sempre indicato nel calendario.",
  },
  {
    q: "Chi può diventare socio?",
    a: "Chiunque condivida le finalità dell'associazione e ne accetti lo statuto. La registrazione online è riservata ai maggiorenni; per i minori la domanda va presentata da un genitore, scrivendo alla segreteria.",
  },
  {
    q: "Quanto tempo richiede l'approvazione?",
    a: "Il Consiglio Direttivo esamina le domande con regolarità, di norma entro pochi giorni. Lo stato della domanda è sempre visibile nella tua Area Soci.",
  },
  {
    q: "Come funziona la tessera digitale?",
    a: "Dopo il pagamento trovi la tessera nella tua Area Soci, con nome, numero, scadenza e un codice QR. All'ingresso degli eventi lo staff inquadra il codice e registra la tua presenza. Puoi aprirla dal telefono in qualsiasi momento.",
  },
  {
    q: "Quanto dura la tessera?",
    a: "Dodici mesi dalla data del pagamento. Puoi rinnovarla anche prima della scadenza: i nuovi dodici mesi partono dal giorno successivo alla scadenza attuale.",
  },
  {
    q: "Come posso pagare la quota?",
    a: "Con bonifico bancario sul conto dell'associazione presso Intesa Sanpaolo, usando la causale indicata nella tua Area Soci: la tessera si attiva appena la segreteria registra il versamento. Quando sarà attivo, potrai pagare anche con carta e la tessera si attiverà all'istante.",
  },
  {
    q: "Il pagamento online è sicuro?",
    a: "Il pagamento avviene su Stripe, uno dei principali circuiti di pagamento al mondo. L'associazione non vede né conserva i dati della tua carta.",
  },
  {
    q: "Cosa succede ai miei dati se acconsento agli sponsor?",
    a: "Il consenso è facoltativo e separato dalla domanda di ammissione. Se lo dai, comunichiamo a sponsor e partner dell'associazione soltanto nome, cognome, email, telefono, comune e interessi, perché possano proporti iniziative nei settori cultura, eventi, enogastronomia, benessere e lifestyle. Puoi revocarlo in qualsiasi momento dalla tua Area Soci.",
  },
  {
    q: "Perché servono codice fiscale e indirizzo?",
    a: "Sono i dati richiesti per la tenuta del libro soci di un'associazione. Li trattiamo solo per questa finalità, come descritto nell'informativa sulla privacy.",
  },
];

export const passions = [
  "Musica",
  "Filosofia",
  "Arte & scultura",
  "Cinema",
  "Benessere",
  "Mare",
  "Trekking",
  "Cucina",
  "Poesia",
  "Fotografia",
  "Viaggi",
  "Artigianato",
];

/* -------------------------------------------------------------------------- */
/*  Journal                                                                    */
/* -------------------------------------------------------------------------- */

export type Article = {
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  body: string[];
  pullQuote?: string;
};

export const articles: Article[] = [
  {
    slug: "il-banchetto-di-itaca-prima-edizione",
    title: "Una sera in tre atti",
    category: "Cronache",
    author: "Redazione Itaca",
    date: "2026-08-05",
    readTime: "5 minuti",
    excerpt:
      "Il 24 luglio il Panama by Borsalino è diventato un banchetto romano-greco. Il racconto della prima edizione.",
    image: brandPhotos.fuoco,
    pullQuote: "«Ogni Banchetto è una dimostrazione, non una prova generale.»",
    body: [
      "Alle sette di sera il Panama by Borsalino ha cambiato volto. Un'illuminazione scenica disegnava il perimetro dello spazio, i bracieri erano accesi, e un unico tavolo lo attraversava da un capo all'altro.",
      "Il primo atto è stato l'Aperitivo: l'accoglienza, le coppe in stile kylix tra le mani. Poi il Convivium, la cena a tavola lunga, interrotta tre volte da interventi performativi: il fuoco, la danza, la magia.",
      "Dopo le dieci la sera ha cambiato registro. Il Symposion ha trasformato la tavola in club, con un DJ set fino a mezzanotte e mezza. Nessuno aveva fretta di andarsene.",
      "Il Banchetto di Itaca resta il punto di riferimento per ogni formato futuro: il luogo dove gli ideali di bellezza e armonia smettono di essere parole e diventano una sera da vivere insieme.",
    ],
  },
  {
    slug: "le-itache-della-vita",
    title: "Che cosa significano le Itache",
    category: "Filosofia del viaggio",
    author: "Redazione Itaca",
    date: "2026-10-28",
    readTime: "6 minuti",
    excerpt: "Rileggere Kavafis oggi, tra turismo veloce e desiderio di ritorno. Una riflessione sul senso della meta e sul piacere della strada.",
    image: brandPhotos.mareScogli,
    pullQuote: "«Itaca ti ha dato il bellissimo viaggio. Senza di lei non ti saresti messo in cammino.»",
    body: [
      "Costantino Kavafis pubblicò Itaca nel 1911, ad Alessandria d'Egitto. Da lì immaginava un Ulisse diverso da quello di Omero: un viaggiatore che non teme i mostri, perché i mostri, scrive, li portiamo dentro di noi.",
      "La poesia rovescia l'idea di meta. Itaca resta importante, è il motivo stesso della partenza, ma non deve affrettare il ritorno. Meglio arrivarci con il bagaglio di ciò che si è guadagnato lungo la strada, senza aspettarsi che sia lei a renderci ricchi.",
      "Abbiamo scelto questo nome perché descrive ciò che desideriamo per chi partecipa: un luogo a cui tornare che lascia aperto l'orizzonte, una comunità capace di rimetterci in cammino con qualche idea in più e qualche amico nuovo.",
      "Forse è questo il senso delle Itache, al plurale, con cui il poeta chiude i suoi versi: ognuno ha la propria, e ciascuna vale per il viaggio che ci ha fatto compiere.",
    ],
  },
  {
    slug: "sette-ideali",
    title: "Sette ideali, sette comportamenti",
    category: "Il Club",
    author: "Redazione Itaca",
    date: "2026-09-18",
    readTime: "4 minuti",
    excerpt: "Bellezza, armonia, virtù, conoscenza, giustizia, libertà, bene comune: come i valori classici diventano scelte concrete.",
    image: brandPhotos.ritratto,
    body: [
      "I valori classici possono diventare facilmente decorazione. Per questo ogni ideale di Itaca Society deve potersi verificare in una scelta concreta: che cosa si serve a tavola, quale musica si sceglie, con chi si stringe una collaborazione, che cosa si rifiuta.",
      "La bellezza si traduce nella cura scenografica di ogni luogo e nel rifiuto degli elementi commerciali invasivi. L'armonia, in programmi che alternano intensità e pausa. La conoscenza, in talk e momenti culturali sempre presenti.",
      "La giustizia e il bene comune guardano al territorio: un patto chiaro con Pietrasanta e le sue istituzioni, e una parte del valore che resta qui, nell'artigianato locale e nelle filiere corte.",
    ],
  },
  {
    slug: "la-lentezza-del-marmo",
    title: "La lentezza del marmo",
    category: "Mestieri",
    author: "Redazione Itaca",
    date: "2026-11-12",
    readTime: "6 minuti",
    excerpt: "Nelle botteghe di Pietrasanta un blocco può restare in attesa per anni. Una mattina con chi sa aspettare la forma giusta.",
    image: photos.marmoCave,
    body: [
      "Alle sette del mattino le serrande delle botteghe di Pietrasanta si alzano una dopo l'altra. Il primo suono è quello dell'acqua che scorre sui banchi, poi arriva il ritmo regolare degli scalpelli. La città lavora il marmo da secoli e conserva, in questo rumore, una sua forma di pazienza.",
      "In un'epoca in cui tutto si misura in giorni, le botteghe custodiscono un tempo diverso, fatto di tentativi, di misure prese a mano, di errori che non si possono cancellare.",
      "È una lezione che vogliamo portare dentro Le Fasi di Itaca: una mattina tra laboratori e fonderie, per guardare da vicino il lavoro di chi trasforma la pietra in forma.",
    ],
  },
  {
    slug: "sussurra-non-urla",
    title: "Sussurra, non urla",
    category: "Convivialità",
    author: "Redazione Itaca",
    date: "2026-10-02",
    readTime: "4 minuti",
    excerpt: "Il fuoco, la tavola, il mare: perché a Itaca la cura del dettaglio conta più di qualsiasi annuncio.",
    image: brandPhotos.piatto,
    body: [
      "In Versilia le estati sono piene di inviti urlati. Itaca Society sceglie un registro diverso: poche parole, scelte con cura, e un'esperienza che parli da sé.",
      "La cura del dettaglio è l'unica forma di lusso che ci interessa: un piatto servito alla luce giusta, una musica che accompagna senza coprire le voci, un tavolo dove ci si siede accanto a qualcuno che ancora non si conosce.",
      "Il fuoco, la tavola, il mare. Itaca racconta un ritorno, prima ancora di una festa.",
    ],
  },
];
