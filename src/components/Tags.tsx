export function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="tags" aria-label="Herramientas y áreas">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}
