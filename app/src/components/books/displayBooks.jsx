import { Book } from "./book";

export function DisplayBooks({ books }) {
  return (
    <div>
      <ul className="[&>*:nth-child(1)] mt-20">
        {books.map((el) => (
          <li key={el._id}>
            <Book
              title={el.title}
              id={el._id}
              cover={el.cover}
              description={el.description}
              author={el.author}
              style={{ imgHeight: "h-74" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
