import { useState, useEffect } from "react";

const defaultEntry = {
  title: "",
  director: "",
  type: "movie",
  yearOrSeason: "",
  durationMinutes: "",
  location: "",
  budget: "",
  rating: "",
};

export default function EntryForm({ onSubmit, editing }) {
  const [form, setForm] = useState(defaultEntry);

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(defaultEntry);
  };

  return (
   <form onSubmit={submit} style={{ padding: 16, border: "1px solid #ddd" }}>
  <input
    placeholder="Title"
    value={form.title}
    onChange={(e) => setForm({ ...form, title: e.target.value })}
    required
  />
  <br />

  <input
    placeholder="Director"
    value={form.director}
    onChange={(e) => setForm({ ...form, director: e.target.value })}
  />
  <br />

  <select
    value={form.type}
    onChange={(e) => setForm({ ...form, type: e.target.value })}
  >
    <option value="movie">Movie</option>
    <option value="tv">TV</option>
    <option value="other">Other</option>
  </select>
  <br />

  <input
    placeholder="Year / Season"
    value={form.yearOrSeason}
    onChange={(e) => setForm({ ...form, yearOrSeason: e.target.value })}
  />
  <br />

  <input
    placeholder="Budget"
    value={form.budget}
    onChange={(e) => setForm({ ...form, budget: e.target.value })}
  />
  <br />

  {/* ✅ new fields added */}

  <input
    placeholder="Location"
    value={form.location}
    onChange={(e) => setForm({ ...form, location: e.target.value })}
  />
  <br />

  <input
    placeholder="Duration"
    value={form.duration}
    onChange={(e) => setForm({ ...form, duration: e.target.value })}
  />
  <br />

  <input
    placeholder="Rating"
    value={form.rating}
    onChange={(e) => setForm({ ...form, rating: e.target.value })}
  />
  <br />

  <button type="submit">Save</button>
</form>

  );
}
