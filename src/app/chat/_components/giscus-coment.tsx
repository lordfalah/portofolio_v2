"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import React from "react";

const GiscusComent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Giscus
      id="comments"
      repo={process.env.NEXT_PUBLIC_GISCUS_REPO as never}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID as never}
      data-category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY as never}
      data-category-id={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID as never}
      mapping={process.env.NEXT_PUBLIC_GISCUS_MAPPING as never}
      reactionsEnabled={
        process.env.NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED as never
      }
      term={process.env.NEXT_PUBLIC_GISCUS_TERM}
      emitMetadata={process.env.NEXT_PUBLIC_GISCUS_EMIT_METADATA as never}
      inputPosition={process.env.NEXT_PUBLIC_GISCUS_INPUT_POSITION as never}
      theme={theme === "dark" ? "dark" : "light"}
      lang={process.env.NEXT_PUBLIC_GISCUS_LANG as never}
      loading="lazy"
    />
  );
};

export default GiscusComent;
