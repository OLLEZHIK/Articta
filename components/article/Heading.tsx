interface HeadingProps {
  content: string;
  level?: 1 | 2 | 3;
}

export function Heading({ content, level = 2 }: HeadingProps) {
  switch (level) {
    case 1:
      return <h1 className="article-h1">{content}</h1>;
    case 2:
      return <h2 className="article-h2">{content}</h2>;
    case 3:
      return <h3 className="article-h3">{content}</h3>;
  }
}
