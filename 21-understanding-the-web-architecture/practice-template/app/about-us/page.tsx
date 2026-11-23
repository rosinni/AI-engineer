import Link from "next/link";

export default function AboutUs() {
  return (
    <main>
      <section className="welcome-card">
        <h1>Welcome to About Us </h1>
       
        <Link className="contact-link" href="/">
          Home
        </Link>
      </section>
    </main>
  );
}