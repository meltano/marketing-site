import type { FC } from "react";

declare const Seo: FC<{
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  summary?: string;
  date?: string;
}>;

export default Seo;
