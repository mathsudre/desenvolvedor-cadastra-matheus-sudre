import { Product } from "../../App";
import CustomDrawer from "../CustomDrawer";
import './styles.css';


interface MinicartProps {
  miniCartProducts: Product[];
  setMiniCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function Minicart({ miniCartProducts, setMiniCartProducts }:MinicartProps) {
  

  const handleRemoveFromCart = (item: Product) => {
    setMiniCartProducts((prev) => {     
      const existingItemIndex = prev.findIndex(cartItem => cartItem.id === item.id);
  
      if (existingItemIndex !== -1) {
        const updatedProducts = [...prev];
        const currentItem = updatedProducts[existingItemIndex];
  
        if (currentItem.quantity && currentItem.quantity > 1) {          
          currentItem.quantity -= 1;
          return updatedProducts;
        } else {
          
          return updatedProducts.filter((_, index) => index !== existingItemIndex);
        }
      }
      return prev; 
    });
  };
  
  return (

    <CustomDrawer
      triggerComponent={
      <div className='container-carrinho'>
            <img src="carrinho-header.png" alt="carrinho-header" />
          <span className='contador-carrinho'>{miniCartProducts.length}</span>
      </div>}
      title={"CARRINHO"}
      >
              
          <ul className="wrapper-list-cart-products">
            {miniCartProducts.map((product,index) => (
              <li key={index}>
                <img src={product.image} alt={product.name} width="100" />

                <div className="wrapper-info-product">
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
                  <span> Quantidade:{product.quantity}</span>
                </div>                
                <button type="button" onClick={() => handleRemoveFromCart(product)}>
                  <img src="/trash.svg" alt="remove cart icon"/>
                </button>
              </li>
            ))}
      </ul>
      
      {miniCartProducts.length === 0 &&        
        <div className="wrapper-shop-bag">        
          <svg fill="none" height="100" viewBox="0 0 24 24" width="100" xmlns="http://www.w3.org/2000/svg"><path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" stroke="#666666" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></svg>
        </div>        
      }
      </CustomDrawer>
  )
}
