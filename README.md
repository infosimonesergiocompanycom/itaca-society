# Itaca Society

Sito dell'associazione culturale Itaca Society, con tesseramento online.
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · PostgreSQL · Stripe.

## Tesseramento: come funziona

1. **Registrazione** (`/diventa-socio`): domanda di ammissione con i dati del libro soci
   (anagrafica, codice fiscale, residenza), email e password, accettazione di statuto e privacy.
2. **Approvazione** (`/admin`): il Consiglio Direttivo approva o respinge la domanda.
   All'approvazione viene assegnato il numero di tessera (`IS-AAAA-0001`).
3. **Quota** (`/area-soci`): il socio approvato paga 20 € con carta su Stripe Checkout.
   In alternativa un amministratore registra un versamento in contanti o con bonifico.
4. **Tessera digitale** (`/area-soci`): nome, numero, scadenza e QR firmato. Vale 12 mesi
   dal pagamento; il rinnovo anticipato allunga la validità dalla scadenza precedente.
5. **Ingressi** (`/admin/ingressi`): lo staff sceglie l'evento e inquadra il QR con la
   fotocamera del telefono. La verifica è in tempo reale sul database (una tessera
   scaduta o sospesa risulta subito non valida) e ogni socio viene registrato una sola
   volta per evento. È possibile anche inserire il numero di tessera a mano.
6. **Libro soci**: esportazione CSV da `/admin` (apribile con Excel).

## Avvio in locale

```bash
npm install
cp .env.example .env.local   # poi imposta almeno ADMIN_EMAILS e ALLOW_DEMO_PAYMENTS=true
npm run dev
```

Senza `DATABASE_URL` il sito usa un Postgres locale embedded (PGlite) salvato in `.data/`.
Registrati con una delle email in `ADMIN_EMAILS` per avere accesso all'amministrazione.

## Messa online su Vercel

1. Importa il progetto su Vercel.
2. Aggiungi un database Postgres (Storage → Neon): Vercel imposta `DATABASE_URL`.
3. Imposta le variabili `AUTH_SECRET`, `ADMIN_EMAILS`, `SITE_URL`, `STRIPE_SECRET_KEY`.
4. Su Stripe crea il webhook verso `https://<dominio>/api/stripe/webhook` con l'evento
   `checkout.session.completed` e copia il segreto in `STRIPE_WEBHOOK_SECRET`.
5. Lo schema del database viene creato automaticamente al primo accesso.

## Struttura

```
app/actions.ts            azioni server: registrazione, accesso, pagamento, approvazioni, ingressi
app/diventa-socio         domanda di ammissione
app/accedi                accesso soci
app/area-soci             tessera digitale, stato della domanda, quote e presenze
app/admin                 domande, soci, quote manuali, export CSV, controllo ingressi
app/api/stripe/webhook    conferma dei pagamenti da Stripe
lib/server/               database, sessioni, tessere (QR firmati), pagamenti, configurazione
components/house          blocchi di impaginazione delle pagine editoriali
components/members        moduli, tessera e scanner
data/itacaData.ts         contenuti editoriali (luoghi, eventi, journal, FAQ)
```

## Da sapere

- Gli eventi sono definiti in `data/itacaData.ts`: per aggiungerne uno basta una nuova voce.
- Il recupero password non è ancora automatico: per ora passa dalla segreteria
  (servirebbe un servizio di invio email, es. Resend).
- Le email di notifica (domanda approvata, tessera in scadenza) non sono ancora attive,
  per lo stesso motivo.
