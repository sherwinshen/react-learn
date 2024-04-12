import { usePosts } from "../contexts/usePostContext";

function Results() {
  const { posts } = usePosts();
  return <p>🚀 {posts.length} atomic posts found</p>;
}

function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts();
  return <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search posts..." />;
}

export default function Header() {
  const { onClearPosts } = usePosts();
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}
