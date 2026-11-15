
import { useState } from "react";

function CommentSection() {
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([
    "Comment 1",
    "Comment 2",
    "Comment 3"
  ]);

  function handleSubmit(e) {
    e.preventDefault();

    if (comment.trim() === "") {
      return;
    }

    setComments([...comments, comment.trim()]);
    setComment("");
  }

  return (
    <section className="comments">
      <h2>Comments</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <h3>Existing Comments:</h3>

      <ul>
        {comments.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default CommentSection;
