
import { useState } from "react";
import CommentSection from "./CommentSection";

function BlogPost({ title, content, author, date }) {
  const [likes, setLikes] = useState(0);

  return (
    <article className="blog-post">
      <h2>{title}</h2>

      <p>{content}</p>

      <div className="post-info">
        <p><strong>Author:</strong> {author}</p>
        <p><strong>Date:</strong> {date}</p>
      </div>

      <button
        className="like-button"
        onClick={() => setLikes(likes + 1)}
      >
        ❤️ Like ({likes})
      </button>

      <CommentSection />
    </article>
  );
}

export default BlogPost;
