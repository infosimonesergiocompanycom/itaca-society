/**
 * Statuto di Itaca Society Associazione Culturale (Allegato «A» all'atto costitutivo del 22/04/2026,
 * registrato all'Agenzia delle Entrate, Ufficio territoriale di Lucca, il 30/04/2026, serie 3, n. 368).
 * Trascrizione fedele del testo registrato, senza firme. La numerazione salta dall'Art. 18 all'Art. 20
 * come nell'originale.
 */

export const association = {
  name: "Itaca Society Associazione Culturale",
  address: "Piazza Carducci 22, 55045 Pietrasanta (LU)",
  fiscalCode: "91067300466",
  vat: "02766870469",
  registration: "Atto costitutivo del 22 aprile 2026, registrato all'Agenzia delle Entrate, Ufficio territoriale di Lucca, il 30 aprile 2026 (serie 3, n. 368)",
};

export type Block = { article?: string; paragraphs: string[]; list?: string[]; after?: string[] };
export type Title = { title: string; blocks: Block[] };

export const statuto: Title[] = [
  {
    title: "Titolo I – Denominazione e sede",
    blocks: [
      {
        article: "Art. 1",
        paragraphs: [
          "È costituita l'Associazione culturale denominata «ITACA SOCIETY Associazione Culturale».",
          "L'Associazione è libera, apolitica, con durata illimitata nel tempo e senza scopo di lucro.",
          "L'Associazione ha sede in Pietrasanta (LU), Piazza Carducci 22.",
        ],
      },
      {
        article: "Art. 2",
        paragraphs: [
          "L'Associazione «ITACA SOCIETY Associazione Culturale» è costituita nel rispetto delle norme della Costituzione Italiana, del Codice Civile e della Legislazione vigente.",
        ],
      },
    ],
  },
  {
    title: "Titolo II – Scopo e oggetto",
    blocks: [
      {
        article: "Art. 3",
        paragraphs: ["L'Associazione non ha scopo di lucro e si propone:"],
        list: [
          "di promuovere la cultura, l'arte e l'identità territoriale della Versilia, valorizzando il legame tra le arti e i mestieri tipici del territorio versiliese, come patrimonio storico-culturale da salvaguardare e innovare;",
          "di mantenere, riscoprire e far conoscere le tradizioni popolari, i prodotti dell'artigianato locale, della produzione agricola e la ricchezza enogastronomica del territorio attraverso festival, eventi e mercati, valorizzando il tessuto produttivo locale, i prodotti tipici e le ricchezze naturali del territorio;",
          "di ideare iniziative volte a conciliare stili di vita tradizionali con le concezioni più attuali e più sostenibili sotto il profilo sia del benessere fisico e mentale delle persone, sia del rispetto della natura e dell'ambiente;",
          "di approfondire e promuovere le espressioni artistiche nei campi delle lavorazioni artigianali e artistiche del marmo e del bronzo, della musica, delle arti visive e del teatro, la loro evoluzione nel corso del tempo ed il loro sviluppo futuro, attraverso l'organizzazione di corsi di approfondimento, eventi di divulgazione e concerti anche con l'ausilio e la collaborazione con altre Associazioni ed Enti di riferimento operanti sul territorio;",
          "di porsi come interlocutore e partner progettuale per Enti pubblici e privati, Associazioni, Scuole e Università, per la realizzazione di progetti coerenti con le finalità istituzionali.",
        ],
      },
    ],
  },
  {
    title: "Titolo III – Soci",
    blocks: [
      {
        article: "Art. 4",
        paragraphs: [
          "Il numero dei soci è illimitato. L'associazione è aperta a tutti coloro che, interessati alla realizzazione delle finalità istituzionali, ne condividono lo spirito e gli ideali.",
          "I soci si dividono in soci fondatori e soci ordinari.",
          "Sono soci fondatori le persone che hanno dato vita all'Associazione;",
          "Sono soci ordinari le persone o gli enti che aderiscono agli scopi ed alle finalità dell'Associazione.",
          "Tutti i soci ordinari si impegnano a pagare, per tutta la permanenza del vincolo associativo, la quota annuale stabilita dal Consiglio direttivo.",
          "Le persone, le associazioni e gli Enti privati senza scopo di lucro che intendano diventare soci del sodalizio dovranno presentare richiesta di associazione firmata. Per le associazioni e gli Enti privati la richiesta di associazione sarà firmata dal proprio rappresentante legale. All'atto dell'accettazione della richiesta da parte dell'Associazione il richiedente acquisirà ad ogni effetto la qualifica di socio.",
        ],
      },
      { article: "Art. 5", paragraphs: ["L'ammissione dei soci è deliberata dal Consiglio Direttivo."] },
      {
        article: "Art. 6",
        paragraphs: [
          "Tutti i soci sono tenuti a rispettare le norme del presente statuto e l'eventuale regolamento interno, secondo le deliberazioni assunte dagli organi preposti.",
        ],
      },
      {
        article: "Art. 7",
        paragraphs: ["La qualifica di socio dà diritto:"],
        list: [
          "a partecipare alla vita associativa, esprimendo il proprio voto nelle assemblee, anche in ordine all'approvazione e modifica delle norme dello Statuto e di eventuali regolamenti;",
          "a godere dell'elettorato attivo e passivo per le elezioni degli organi direttivi.",
        ],
        after: [
          "I soci sono tenuti:",
          "– all'osservanza dello Statuto, del Regolamento Interno e delle deliberazioni assunte dagli organi sociali;",
          "– al pagamento del contributo associativo.",
        ],
      },
    ],
  },
  {
    title: "Titolo IV – Recesso ed esclusione",
    blocks: [
      {
        article: "Art. 8",
        paragraphs: [
          "La qualifica di socio si perde per recesso, esclusione o a causa di morte. Le dimissioni da socio dovranno essere presentate per iscritto al Consiglio Direttivo. L'esclusione sarà deliberata dal Consiglio Direttivo nei confronti del socio:",
        ],
        list: [
          "a) che non ottemperi alle disposizioni del presente statuto, degli eventuali regolamenti e delle deliberazioni adottate dagli organi dell'Associazione;",
          "b) che si renda moroso nel versamento dei contributi;",
          "c) che svolga o tenti di svolgere attività contrarie agli interessi dell'Associazione;",
          "d) che, in qualunque modo, arrechi danni gravi, anche morali, all'Associazione.",
        ],
        after: [
          "I soci espulsi possono ricorrere per iscritto contro il provvedimento entro trenta giorni al Collegio dei probiviri, o in mancanza dal Consiglio direttivo.",
        ],
      },
    ],
  },
  {
    title: "Titolo V – Risorse economiche e Fondo Comune",
    blocks: [
      {
        article: "Art. 9",
        paragraphs: ["L'associazione trae le risorse economiche per il suo funzionamento e per lo svolgimento delle sue attività da:"],
        list: [
          "a) quote e contributi degli associati;",
          "b) quote e contributi per la partecipazione e organizzazione di manifestazioni ed eventi;",
          "c) contributi e erogazioni liberali degli associati, istituti bancari, fondazioni e di terzi in genere;",
          "d) contributi dello Stato, delle regioni, di enti locali, di enti o di istituzioni pubblici, anche finalizzati al sostegno di specifici e documentati programmi realizzati nell'ambito dei fini statutari;",
          "e) entrate derivanti da prestazioni di servizi convenzionati;",
          "f) proventi delle cessioni di beni e servizi agli associati e a terzi, anche attraverso lo svolgimento di attività economiche di varia natura, svolte in maniera ausiliaria e sussidiaria e comunque finalizzate al raggiungimento degli obiettivi istituzionali;",
          "g) entrate derivanti da iniziative promozionali finalizzate al proprio finanziamento, quali eventi, concerti, festival e sottoscrizioni anche a premi;",
          "h) eredità, donazioni e legati;",
          "i) altre entrate compatibili con le finalità sociali dell'associazionismo anche di natura commerciale.",
        ],
        after: [
          "I contributi degli aderenti sono costituiti dalle quote di associazione annuale, stabilite dal Consiglio direttivo e da eventuali contributi straordinari stabiliti dall'assemblea, che ne determina l'ammontare.",
          "Le elargizioni in danaro, le donazioni e i lasciti, sono accettate dal Consiglio Direttivo, che delibera sulla utilizzazione di esse, in armonia con finalità statutarie dell'organizzazione.",
          "È vietato distribuire, anche in modo indiretto, utili o avanzi di gestione nonché fondi, riserve o capitale durante la vita dell'Associazione, salvo che la destinazione o la distribuzione non siano imposte dalla legge.",
        ],
      },
      {
        article: "Art. 10",
        paragraphs: [
          "L'anno finanziario inizia il 1° gennaio e termina il 31 dicembre di ogni anno.",
          "Il Consiglio direttivo deve redigere il bilancio preventivo e quello consuntivo.",
          "Il bilancio preventivo ed il bilancio consuntivo devono essere approvati dall'Assemblea ordinaria ogni anno entro il mese di maggio.",
          "Esso deve essere depositato presso la sede dell'Associazione entro i 15 giorni precedenti la seduta per poter essere consultato da ogni associato.",
        ],
      },
    ],
  },
  {
    title: "Titolo VI – Organi dell'Associazione",
    blocks: [
      {
        article: "Art. 11",
        paragraphs: ["Gli organi dell'Associazione sono:"],
        list: ["l'Assemblea dei soci;", "il Consiglio direttivo;", "il Presidente;"],
        after: ["Quando nominati:", "– il Collegio dei revisori;", "– il Collegio dei probiviri;"],
      },
      {
        article: "Art. 12",
        paragraphs: [
          "L'assemblea dei soci è il momento fondamentale di confronto, atto ad assicurare una corretta gestione dell'Associazione ed è composta da tutti i soci, ognuno dei quali ha diritto ad un voto. Ogni socio può rappresentare, mediante delega scritta, non più di un associato.",
          "L'Assemblea è convocata almeno una volta all'anno in via ordinaria, ed in via straordinaria quando sia necessaria o sia richiesta dal Consiglio direttivo o da almeno un terzo degli associati.",
          "In prima convocazione l'assemblea ordinaria è valida se è presente la maggioranza dei soci, e delibera validamente con la maggioranza dei presenti; in seconda convocazione la validità prescinde dal numero dei presenti.",
          "L'assemblea straordinaria delibera in prima convocazione con la presenza e col voto favorevole della maggioranza dei soci e in seconda convocazione a maggioranza dei presenti.",
          "La delibera di scioglimento dell'Associazione deve essere assunta con il voto favorevole dei tre quarti (3/4) degli associati.",
          "La convocazione va fatta mediante avviso pubblico scritto presso la sede e inviato ai soci almeno 10 giorni prima della data dell'assemblea con qualsiasi mezzo di comunicazione e deve contenere l'ordine del giorno, il luogo (presso la sede o altrove), la data e l'orario della prima e della seconda convocazione",
        ],
      },
      {
        article: "Art. 13",
        paragraphs: ["L'assemblea ordinaria ha i seguenti compiti:"],
        list: [
          "elegge il Consiglio direttivo, il Collegio dei revisori e il Collegio dei probiviri;",
          "approva il bilancio preventivo e il bilancio consuntivo;",
          "approva il regolamento interno;",
          "delibera su tutti gli altri argomenti attinenti alla gestione dell'Associazione sottoposti al suo esame dal Consiglio direttivo.",
        ],
        after: [
          "L'assemblea straordinaria delibera sulle modifiche dello Statuto e l'eventuale scioglimento dell'Associazione.",
          "L'assemblea è presieduta dal Presidente dell'Associazione ed in sua assenza dal vice Presidente o dalla persona designata dall'assemblea stessa. L'assemblea inoltre elegge ogni volta un segretario che dovrà sottoscrivere il verbale finale insieme al Presidente.",
        ],
      },
      {
        article: "Art. 14",
        paragraphs: [
          "Il consiglio direttivo è composto da un numero dispari con un minimo di 3 membri ed un massimo di 5 membri, eletti dall'Assemblea fra i propri componenti.",
          "Il Consiglio Direttivo eleggerà tra i suoi componenti, in occasione della prima adunanza, il Presidente, il Vice Presidente ed il Segretario Tesoriere.",
          "Il Consiglio direttivo è validamente costituito quando sono presenti tutti i membri. I membri del Consiglio direttivo svolgono la loro attività gratuitamente e durano in carica tre anni e possono essere rinnovati.",
          "Il consiglio direttivo può essere revocato dall'assemblea con la maggioranza di 2/3 dei soci.",
        ],
      },
      {
        article: "Art. 15",
        paragraphs: ["Il Consiglio Direttivo è convocato:"],
        list: ["dal Presidente;", "da almeno 2 dei componenti, su richiesta motivata;", "su richiesta motivata e scritta di almeno il 30% dei soci;"],
        after: [
          "Il Consiglio Direttivo ha tutti i poteri di ordinaria e straordinaria amministrazione, salvo quanto riservato all'Assemblea.",
          "Nella gestione ordinaria i suoi compiti sono:",
          "a) curare l'esecuzione delle deliberazioni assembleari;",
          "b) redigere il bilancio preventivo ed il bilancio consuntivo;",
          "c) predisporre i regolamenti interni;",
          "d) stipulare tutti gli atti e contratti inerenti all'attività dell'Associazione;",
          "e) deliberare circa l'ammissione e l'esclusione degli associati;",
          "f) stabilire la quota di associazione;",
          "g) compiere tutti gli atti e le operazioni per la corretta amministrazione dell'Associazione.",
          "Di ogni riunione deve essere redatto verbale che rimane nella sede a disposizione dei Soci.",
        ],
      },
      {
        article: "Art. 16",
        paragraphs: [
          "Il Presidente è il legale rappresentante dell'Associazione a tutti gli effetti; egli convoca e presiede il Consiglio direttivo, sottoscrive tutti gli atti amministrativi compiuti dall'Associazione; può aprire e chiudere conti correnti bancari e postali e procedere agli incassi.",
          "Può conferire ai soci deleghe per la gestione di attività varie, previa approvazione del Consiglio direttivo.",
        ],
      },
      {
        article: "Art. 17",
        paragraphs: [
          "Il Collegio dei revisori deve essere nominato quando vi è l'obbligo di legge ed è composto da tre membri eletti dall'Assemblea al di fuori dei componenti del Consiglio direttivo e dura in carica tre anni. Verifica periodicamente la regolarità formale e sostanziale della contabilità, redige apposita relazione da allegare al bilancio preventivo e consuntivo.",
        ],
      },
      {
        article: "Art. 18",
        paragraphs: [
          "Il Collegio dei probiviri, è un organo facoltativo; è composto da tre soci eletti in assemblea e dura in carica tre anni.",
          "Decide insindacabilmente, entro trenta giorni dalla presentazione del ricorso, sulle decisioni di espulsione e sui dinieghi di ammissione.",
          "In mancanza della nomina, le relative funzioni vengono svolte dal Consiglio direttivo.",
        ],
      },
      { article: "Art. 20", paragraphs: ["Tutte le cariche elettive sono gratuite. Ai soci compete solo il rimborso delle spese regolarmente documentate."] },
      {
        article: "Art. 21",
        paragraphs: [
          "Deve essere assicurata una sostanziale pubblicità e trasparenza degli atti relativi all'attività dell'Associazione, con particolare riferimento ai Bilanci o Rendiconti annuali. Tali documenti sociali, conservati presso la sede sociale, devono essere messi a disposizione dei soci per la consultazione.",
        ],
      },
    ],
  },
  {
    title: "Titolo VII – Scioglimento",
    blocks: [
      {
        article: "Art. 22",
        paragraphs: [
          "Lo scioglimento dell'Associazione può essere deliberato dall'assemblea con il voto favorevole di almeno i tre quarti degli associati aventi diritto di voto.",
          "In caso di scioglimento dell'Associazione sarà nominato un liquidatore, scelto anche fra i non soci. Esperita la liquidazione di tutti i beni mobili ed immobili, estinte le obbligazioni in essere, tutti i beni residui saranno devoluti a Enti o Associazioni che perseguano la promozione e lo sviluppo di argomenti analoghi a quelli dell'Associazione, e comunque per finalità di utilità sociale, fatte salve diverse disposizioni di legge.",
        ],
      },
      { article: "Art. 23", paragraphs: ["Norma finale – Per quanto non previsto dal presente statuto valgono le norme di legge vigente in materia."] },
    ],
  },
];
