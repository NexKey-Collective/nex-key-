import { useState } from "react";
export function ImageWithFallback({ src, alt, className, ...props }) {
  const [failedSource, setFailedSource] = useState(null);
  return src && failedSource !== src ? (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      {...props}
      onError={() => setFailedSource(src)}
    />
  ) : (
    <div
      className={`${className || ""} grid place-items-center bg-[#e9e2d7] text-[#8a8175] text-xs`}
      role="img"
      aria-label={alt || "Photo unavailable"}
    >
      Photo unavailable
    </div>
  );
}
