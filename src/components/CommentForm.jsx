
import { useState } from "react";

function CommentForm({ onAddComment, postId }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !comment.trim()) {
      setError("Please enter your name and comment.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            postId: Number(postId),
            name: name.trim(),
            body: comment.trim()
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const newComment = await response.json();

      onAddComment({
        ...newComment,
        id: `local-${Date.now()}`,
        name: name.trim(),
        body: comment.trim()
      });

      setName("");
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
      setError("Unable to post your comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="comments">
      <h2>Leave a Comment</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="comment-name">Your Name:</label>
          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment-text">Your Comment:</label>
          <textarea
            id="comment-text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Write your comment here..."
            required
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Posting..." : "Submit Comment"}
        </button>
      </form>
    </section>
  );
}

export default CommentForm;
