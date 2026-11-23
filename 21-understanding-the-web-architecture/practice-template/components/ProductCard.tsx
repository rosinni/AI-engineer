export function ProductCard({ name, price }: { name: string; price: number }){

    return(
        <div className="product-card">
            <h2>{name}</h2>
            <p>Price: ${price}</p>
        </div>
    )
    
}