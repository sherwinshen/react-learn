import { createContext, useState, useContext } from "react";
import { createRandomPost } from "../utils";
import { PostT } from "../type";

// 1) CREATE A CONTEXT
const PostContext = createContext<{
  posts: PostT[];
  searchQuery: string;
  onAddPost: (post: PostT) => void;
  onClearPosts: () => void;
  setSearchQuery: (query: string) => void;
}>({
  posts: [],
  searchQuery: "",
  onAddPost: () => {},
  onClearPosts: () => {},
  setSearchQuery: () => {},
});

// 2) PROVIDE VALUE TO CHILD COMPONENTS
function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState(() => Array.from({ length: 8 }, () => createRandomPost()));
  const [searchQuery, setSearchQuery] = useState("");
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) => `${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase()))
      : posts;

  function handleAddPost(post: PostT) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        searchQuery,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

// 3) CONSUMING CONTEXT VALUE
function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export { PostProvider, usePosts };
