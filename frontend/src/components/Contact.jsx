import { useState } from 'react';

function Contact() {
  const [message, setMessage] = useState('');

  return (
    <section className="section">
      <div className="section-heading">
        <span className="section-label">Contact</span>
        <h2>Let’s connect</h2>
      </div>

      <p>Write your message below.</p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        className="contact-input"
        rows="5"
      />

      <p className="char-count">Characters: {message.length}</p>
    </section>
  );
}

export default Contact;
