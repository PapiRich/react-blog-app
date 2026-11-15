
import { useState, useEffect } from "react";
import { Link } from "react-router";

function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Unable to load blog posts. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <main className="blog-container">
        <h2>Loading blog posts...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="blog-container">
        <p role="alert">{error}</p>
      </main>
    );
  }

  return (
    <main className="blog-container">
      <h1>Welcome to My Blog</h1>

      {posts.map((post) => (
        <article className="blog-post" key={post.id}>
          <h2>{post.title}</h2>

          <p>{post.body.substring(0, 100)}...</p>

          <Link
            to={`/post/${post.id}`}
            className="read-more"
          >
            Read More →
          </Link>
        </article>
      ))}
    </main>
  );
}

export default BlogPostsPage;
