import { useState } from "react";

/** Product photo with an automatic fallback so no tile ever renders empty. */
export function SmartImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[var(--soft)] ${className}`}
        aria-label={alt}
        role="img"
      >
        <span className="text-[26px] font-extrabold tracking-[-0.03em] text-[var(--emerald)]/45">
          {alt.slice(0, 1).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
