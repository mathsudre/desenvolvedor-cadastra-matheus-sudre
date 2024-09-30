
import './App.css';
import CategoryShelf from './components/CategoryShelf';
import Header from './components/Header';
import { useEffect, useState } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  parcelamento: Array<number>;
  color: string;
  image: string;
  size: Array<string>;
  date: string;
  quantity?: number
}

function App() {

  const [products, setProducts] = useState<Product[]>([]);
  const [miniCartProducts, setMiniCartProducts] = useState<Product[]>([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header miniCartProducts={miniCartProducts} setMiniCartProducts={setMiniCartProducts}/>
      <main className='container-home-category'>        
        <CategoryShelf products={products} miniCartProducts={miniCartProducts} setMiniCartProducts={setMiniCartProducts}/>
      </main>      
    </>
  )
}

export default App
