import { shortDate } from "@/lib/format";
import type { Article } from "@/data/itacaData";

export function ArticleMeta({ article, light }: { article: Article; light?: boolean }) {
  return (
    <p className={light ? "text-xs text-calce/70" : "text-xs text-tortora"}>
      {article.author} · {shortDate(article.date)} · {article.readTime}
    </p>
  );
}
