export default function ContactPage() {
  return (
    <main>
      <section className="contact-card">
        <h1>Contact Us</h1>
        <p>Have a question or want to learn more? Get in touch with us.</p>

        <form className="contact-form">
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" />
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} />
          </div>

          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
}
