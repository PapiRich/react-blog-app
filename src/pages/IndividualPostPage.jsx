
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import CommentForm from "../components/CommentForm";

function IndividualPostPage({ commentsByPost, addComment }) {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [apiComments, setApiComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPost() {
      setLoading(true);
      setCommentsLoading(true);
      setError("");
      setCommentsError("");
      setPost(null);
      setAuthor(null);
      setApiComments([]);

      try {
        // Fetch the individual blog post
        const postResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          { signal: controller.signal }
        );

        if (!postResponse.ok) {
          throw new Error("Failed to fetch post");
        }

        const postData = await postResponse.json();

        if (!postData.id) {
          throw new Error("Post not found");
        }

        // Fetch the author associated with the post
        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${postData.userId}`,
          { signal: controller.signal }
        );

        if (!userResponse.ok) {
          throw new Error("Failed to fetch author");
        }

        const userData = await userResponse.json();

        setPost(postData);
        setAuthor(userData);

        // Fetch comments for the selected blog post
        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
          { signal: controller.signal }
        );

        if (!commentsResponse.ok) {
          throw new Error("Failed to fetch comments");
        }

        const commentsData = await commentsResponse.json();
        setApiComments(commentsData);

      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching data:", error);
          setError("Unable to load blog post data.");
          setCommentsError("Unable to load comments.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          setCommentsLoading(false);
        }
      }
    }

    fetchPost();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <main className="blog-container">
        <h2>Loading blog post...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="blog-container">
        <p role="alert">{error}</p>
        <Link to="/">Back to Blog Posts</Link>
      </main>
    );
  }

  // Combine API comments with locally added comments
  const allComments = [
    ...apiComments,
    ...(commentsByPost[id] || [])
  ];

  return (
    <main className="blog-container">
      <article className="blog-post">

        <Link to="/" className="back-link">
          ← Back to Blog Posts
        </Link>

        <h1>{post.title}</h1>

        <div className="post-info">
          <p><strong>Author:</strong> {author.name}</p>
          <p><strong>Email:</strong> {author.email}</p>
        </div>

        <p>{post.body}</p>

        <hr />

        <CommentForm
        postId={id}
          onAddComment={(newComment) => addComment(id, newComment)}
        />

        <section className="comment-list">
          <h2>Comments</h2>

          {commentsLoading ? (
            <p>Loading comments...</p>
          ) : commentsError ? (
            <p role="alert">{commentsError}</p>
          ) : allComments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            <ul>
              {allComments.map((comment) => (
                <li key={comment.id} className="comment-item">
                  <strong>{comment.name}</strong>
                  <p>{comment.body || comment.text}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

      </article>
    </main>
  );
}

export default IndividualPostPage;
