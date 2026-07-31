interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function ArticleImage({ src, alt, caption }: ArticleImageProps) {
  return (
    <figure className="article-image">
      <img src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
