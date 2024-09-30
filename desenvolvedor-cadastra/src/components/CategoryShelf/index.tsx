import { useEffect, useState } from "react";
import { Product } from "../../App";
import CustomSelect from "../CustomSelect";
import FiltroDesktop from "../FiltroDesktop";

interface MinicartProps {
  products: Product[]
  miniCartProducts: Product[];
  setMiniCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function CategoryShelf({ products,setMiniCartProducts }:MinicartProps) {
  const [filter, setFilter] = useState("recent");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [productsToShow, setProductsToShow] = useState(9); 
  
  useEffect(() => {
    let sortedProducts: Product[] = [];
    const productsCopy = products.slice();

    if (filter === "Maior Preço") {
      sortedProducts = productsCopy.sort((a, b) => b.price - a.price);      
    } else if (filter === "Menor Preço") {
      sortedProducts = productsCopy.sort((a, b) => a.price - b.price);
    } else if (filter === "Mais Recentes") {
      sortedProducts = productsCopy.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      sortedProducts = products;
    }
    console.log(sortedProducts)
    setFilteredProducts(sortedProducts);
    setVisibleProducts(sortedProducts.slice(0, productsToShow)); 
  }, [filter, products, productsToShow]);

  useEffect(() => {
    setFilteredProducts(products);
    setVisibleProducts(products.slice(0, productsToShow)); 
  }, [products, productsToShow]);

  const options = ["Mais Recentes", "Menor Preço", "Maior Preço"];

  const handleSelect = (option: string) => {
    setFilter(option);
  };

  
  const handleShowMore = () => {
    setProductsToShow((prev) => prev + 9); 
  };

  const handleAddToCart = (item: Product) => {
    setMiniCartProducts((prev) => {
      // Verifica se o item já existe no carrinho
      const existingItemIndex = prev.findIndex(cartItem => cartItem.id === item.id);
  
      if (existingItemIndex !== -1) {
        // Se já existir, mantém o item e incrementa a quantidade
        const updatedProducts = [...prev];
        // Inicializa a quantidade se não estiver definida
        const currentItem = updatedProducts[existingItemIndex];
        if (!currentItem.quantity) {
          currentItem.quantity = 0; // Inicializa a quantidade se não existir
        }
        currentItem.quantity += 1; // Incrementa a quantidade
        return updatedProducts;
      } else {
        // Se não existir, adiciona o novo item com quantidade 1
        return [...prev, { ...item, quantity: 1 }]; // Adiciona uma nova propriedade 'quantity'
      }
    });
  };
  
  

  
  const handleShowLess = () => {
    setProductsToShow(9); 
  };  

  

  return (
    <>
      <div className="container-header-category">
        <h1>Blusas</h1>        
        <CustomSelect
          options={options}          
          onSelect={handleSelect}          
          products={products}
          setVisibleProducts={setVisibleProducts}
          setFilteredProducts={setFilteredProducts}
        />        
      </div>

      <div className="container-filter-shelf">
        <FiltroDesktop products={products} setFilteredProducts={setFilteredProducts} setVisibleProducts={setVisibleProducts}/>

        <div className="wrapper-vitrine-show-more">
          <ul key={filter}>
            {visibleProducts.map((product,index) => (
              <li key={index}>
                <img src={product.image} alt={product.name} width="100" />
                <h2>{product.name}</h2>
                <p>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <span>
                  até {product.parcelamento[0]}x de{" "}
                  {product.parcelamento[1].toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <button type="button" onClick={()=>handleAddToCart(product)}>comprar</button>
              </li>
            ))}
          </ul>

          <div className="buttons-container">
           
            {productsToShow < filteredProducts.length && (
              <button onClick={handleShowMore} className="btn-show-more">
                Carregar mais
              </button>
            )}
           
            {productsToShow > 9 && (
              <button onClick={handleShowLess} className="btn-show-more">
                Mostrar menos
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
