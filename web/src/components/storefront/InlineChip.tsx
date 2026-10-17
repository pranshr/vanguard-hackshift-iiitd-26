import React from "react";

interface InlineChipProps {
  colorHex?: string;
  imageSrc?: string;
  alt?: string;
  title?: string;
}

export function InlineChip({
  colorHex,
  imageSrc,
  alt = "Terroir bloom",
  title,
}: InlineChipProps) {
  return (
    <span
      className="inline-flex items-center justify-center align-middle mx-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shadow-2xs border border-black/10 shrink-0 select-none transition-transform hover:scale-110"
      style={{
        backgroundColor: colorHex || "var(--signature)",
      }}
      title={title || alt}
    >
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span
          className="w-full h-full rounded-full opacity-90"
          style={{
            background: colorHex
              ? `radial-gradient(circle at 35% 35%, white 0%, ${colorHex} 70%)`
              : "radial-gradient(circle at 35% 35%, white 0%, var(--signature) 70%)",
          }}
        />
      )}
    </span>
  );
}
