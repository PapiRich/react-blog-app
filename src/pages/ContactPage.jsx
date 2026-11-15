import { useState } from "react";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);

    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <main className="blog-container">
      <section className="blog-post">
        <h1>Contact Me</h1>

        <p>
          Have a question or want to get in touch?
          Fill out the form below!
        </p>

        {submitted && (
          <p className="success-message">
            Thank you! Your message has been received.
          </p>
        )}

        <form onSubmit={handleSubmit} className="contact-form">

          <div className="form-group">
            <label htmlFor="contact-name">Name:</label>

            <input
              type="text"
              id="contact-name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">Email:</label>

            <input
              type="email"
              id="contact-email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">Message:</label>

            <textarea
              id="contact-message"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Send Message
          </button>

        </form>
      </section>
    </main>
  );
}

export default ContactPage;