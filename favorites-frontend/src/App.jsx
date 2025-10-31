import { useState } from "react";
import { useInfiniteEntries } from "./hooks/useInfiniteScroll";
import {
  createEntry,
  updateEntry,
  deleteEntry
} from "./api/entriesAPI";

import EntryTable from "./components/EntryTable";
import EntryForm from "./components/EntryForm";

import Button from "@mui/material/Button";

export default function App() {
  const { list, loadMore, hasMore, loading } = useInfiniteEntries();
  const [editing, setEditing] = useState(null);

  const handleSubmit = async (data) => {
    if (editing) {
      await updateEntry(editing._id, data);
      window.location.reload();
    } else {
      await createEntry(data);
      window.location.reload();
    }
  };

  const handleDelete = async (id) => {
    await deleteEntry(id);
    window.location.reload();
  };

  return (
    <div className="bg-black">
          <h1 className="text-3xl font-bold underline bg-black text-white p-4">
      Hello world! change
    </h1>
      <Button variant="contained">Hello MUI</Button>

      <h1 className="text-green-600">Favorites</h1>

      <EntryForm onSubmit={handleSubmit} editing={editing} />

      <EntryTable
        items={list}
        loadMore={loadMore}
        hasMore={hasMore}
        onEdit={setEditing}
        onDelete={handleDelete}
      />

      {loading && <p>Loading…</p>}
    </div>
  );
}
