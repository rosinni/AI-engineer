type CardProps = {
  name: string;
  price: number;
};

export default function Card({name,price}: CardProps) {
  return (
    <article>
      <h2>{name}</h2>
      <p>Precio: ${price}</p>
    </article>
  );
}