import Card from "../components/Card";

export default function Home() {
  return (
    <main>
      <section className="welcome-card">
        <h1>Welcome to the Product Catalog Practice</h1>
        <p>
          This Next.js app is ready for you to build a small product catalog
          using reusable React components and a new route.
        </p>
      </section>
      <section className="product-catalog">
        <Card name="Product 1" price={100} />
        <Card name="Product 2" price={200} />
        <Card name="Product 3" price={300} />
      </section>
    </main>
  );
}
