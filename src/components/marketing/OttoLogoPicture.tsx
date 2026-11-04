interface OttoLogoPictureProps {
  className?: string;
  fetchPriority?: "high" | "low" | "auto";
  loading?: "eager" | "lazy";
  sizes?: string;
}

/**
 * Responsive Otto Pay logo using <picture> with AVIF > WebP > PNG fallback.
 * Files live in /public/assets/otto-logo-{400,800,1200}.{avif,webp,png}.
 */
export default function OttoLogoPicture({
  className,
  fetchPriority = "auto",
  loading = "eager",
  sizes = "(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px",
}: OttoLogoPictureProps) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet="/assets/otto-logo-400.avif 400w, /assets/otto-logo-800.avif 800w, /assets/otto-logo-1200.avif 1200w"
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet="/assets/otto-logo-400.webp 400w, /assets/otto-logo-800.webp 800w, /assets/otto-logo-1200.webp 1200w"
        sizes={sizes}
      />
      <img
        src="/assets/otto-logo-400.png"
        srcSet="/assets/otto-logo-400.png 400w, /assets/otto-logo-800.png 800w, /assets/otto-logo-1200.png 1200w"
        sizes={sizes}
        alt="Otto Pay logo"
        width={1920}
        height={1025}
        loading={loading}
        // @ts-expect-error fetchpriority is valid HTML but not yet typed in React
        fetchpriority={fetchPriority}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
