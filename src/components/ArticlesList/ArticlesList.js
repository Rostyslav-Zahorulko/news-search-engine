const ArticlesList = ({ articles }) => {
  return (
    <ul>
      {articles.map(({ title, url }) => (
        <li key={title}>
          <a href={url} target="_blank" rel="noreferrer noopener">
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ArticlesList;
