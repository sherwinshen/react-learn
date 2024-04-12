import { useState } from "react";
import { usePosts } from "../contexts/usePostContext";

function List() {
  const { posts } = usePosts();
  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

function Posts() {
  return (
    <section>
      <List />
    </section>
  );
}

function FormAddPost() {
  const { onAddPost } = usePosts();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Post body" />
      <button>Add post</button>
    </form>
  );
}

export default function Main() {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
}
