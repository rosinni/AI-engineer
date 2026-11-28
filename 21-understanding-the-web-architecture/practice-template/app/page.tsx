import Link from "next/link";
import { ProductCard } from "../components/ProductCard";

export default function Home() {


  


  return (
    <main>
      <section className="welcome-card">
        <h1>Welcome to the Product Catalog Practice</h1>
        <p>
          This Next.js app is ready for you to build a small product catalog
          using reusable React components and a new route.
        </p>
        <Link className="contact-link" href="/contact">
          Contact
        </Link>
      </section>
      <section className="product-catalog">
        <ProductCard name={"Zapatos"} price={100}/>
        <ProductCard name={"Camisa"} price={50}/>
        <ProductCard name={"Pantalón"} price={75}/>
      </section>
    </main>
  );
}
