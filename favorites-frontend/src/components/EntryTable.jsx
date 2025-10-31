import { useRef, useEffect } from "react";
// import Loader from "./Loader";

const EntryTable = ({ items, loadMore, hasMore, onEdit, onDelete }) => {
  const loaderRef = useRef();

  // infinite scroll
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loaderRef, hasMore]);

  return (
    <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
      <table border={1} width="100%">
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Type</th>
            <th>Year</th>
            <th>Budget</th>
            <th>Location</th>
            <th>Duration</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.director}</td>
              <td>{item.type}</td>
              <td>{item.yearOrSeason}</td>
              <td>{item.budget}</td>
              <td>{item.location}</td>
              <td>{item.durationMinutes}</td>
              <td>{item.rating}</td>
              <td>
                <button onClick={() => onEdit(item)}>✏️</button>
                <button onClick={() => onDelete(item._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {hasMore && <div ref={loaderRef}><Loader /></div>} */}
    </div>
  );
};

export default EntryTable;
