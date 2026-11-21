import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-5 pt-24 text-center">
      <div>
        <p className="eyebrow text-ottone">Fuori rotta</p>
        <h1 className="mt-6 text-[1.9rem] font-semibold sm:text-[2.7rem]">
          Questa strada non porta a Itaca
        </h1>
        <p className="mx-auto mt-6 max-w-md text-tortora">
          La pagina che cerchi non esiste o è stata spostata. Ogni deviazione, però, fa parte del viaggio.
        </p>
        <div className="mt-10">
          <ButtonLink href="/" arrow>
            Torna a casa
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
