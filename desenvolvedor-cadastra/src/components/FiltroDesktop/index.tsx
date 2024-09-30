import { useEffect, useState } from 'react';
import { Product } from '../../App';
import { useIsDesktop } from '../../hook/useIsDesktop';

interface FiltroDesktopType {
  products: Product[];
  setFilteredProducts: (products: Product[]) => void;
  setVisibleProducts: (products: Product[]) => void;
}

export default function FiltroDesktop({ products, setFilteredProducts,setVisibleProducts }: FiltroDesktopType) {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const [showAllColors, setShowAllColors] = useState(false); 
  const isDesktop = useIsDesktop();

  const toggleShowAllColors = () => {
    setShowAllColors(!showAllColors); 
  };

  const priceRanges = [
    { label: "de R$0 até R$50", range: [0, 50] },
    { label: "de R$51 até R$150", range: [51, 150] },
    { label: "de R$151 até R$300", range: [151, 300] },
    { label: "de R$301 até R$500", range: [301, 500] },
    { label: "A partir de R$500", range: [500, Infinity] },
  ];

  const colors = Array.from(new Set(products.map((product) => product.color)));

  const handleColorChange = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  useEffect(() => {
    if (selectedColors.length === 0) {
      setFilteredProducts(products);
      setVisibleProducts(products)
    } else {
      setFilteredProducts(
        products.filter((product) => selectedColors.includes(product.color))
      );
      setVisibleProducts(products.filter((product) => selectedColors.includes(product.color)))
    }
  }, [selectedColors, products, setFilteredProducts]);

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prevSelected) =>
      prevSelected.includes(size)
        ? prevSelected.filter((s) => s !== size)
        : [...prevSelected, size]
    );
  };

  useEffect(() => {
    if (selectedSizes.length === 0) {
      setFilteredProducts(products);
      setVisibleProducts(products)
    } else {
      const filtered = products.filter((product) =>
        product.size.some((size) => selectedSizes.includes(size))
      );
      setFilteredProducts(filtered);
      setVisibleProducts(filtered)
    }
  }, [selectedSizes, products, setFilteredProducts]);

  const getAllSizes = () => {
    const allSizes = products.flatMap((product) => product.size);
    const uniqueSizes = Array.from(new Set(allSizes));  
   
    const letterSizes = ['PP', 'P', 'M', 'G', 'GG'];
    const numberSizes = uniqueSizes.filter(size => !isNaN(Number(size))).sort((a, b) => Number(a) - Number(b));
  
    
    const sortedLetterSizes = letterSizes.filter(size => uniqueSizes.includes(size));
  
   
    return [...sortedLetterSizes, ...numberSizes];
  };

  const isSameRange = (range1: number[], range2: number[]) => {
    return range1[0] === range2[0] && range1[1] === range2[1];
  };

  const handlePriceRangeChange = (range: number[]) => {
    if (isSameRange(selectedPriceRange, range)) {
      setSelectedPriceRange([]); 
    } else {
      setSelectedPriceRange(range); 
    }
  };
  useEffect(() => {
    if (selectedPriceRange.length === 0) {
      setFilteredProducts(products);
      setVisibleProducts(products)
    } else {
      const [minPrice, maxPrice] = selectedPriceRange;
      const filtered = products.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
      setFilteredProducts(filtered);
      setVisibleProducts(filtered)
    }
  }, [selectedPriceRange, products, setFilteredProducts]);
  

  return (
    
    isDesktop ? <div className='container-filter-desktop'>
      <div className="wrapper-filter-container filter-container-cor">
      <h3>Cores</h3>
      <div className="color-options">
        {colors.slice(0, showAllColors ? colors.length : 5).map((color) => (
          <div key={color} className="color-options-wrapper">
            <input
              type="checkbox"
              id={color}
              value={color}
              onChange={() => handleColorChange(color)}
              checked={selectedColors.includes(color)}
            />
            <label htmlFor={color}>{color}</label>
          </div>
        ))}
      </div>

      {/* Botão para mostrar mais/menos cores */}
      {colors.length > 5 && (
        <button onClick={toggleShowAllColors} className="btn-toggle-colors">
            Ver todas as cores
            <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L4.5 6L8 1.00519" stroke="#666666" stroke-linecap="round"/>
            </svg>
        </button>
      )}
    </div>

      {/* Tamanho */}
      <div className="wrapper-filter-container filter-container-size">
        <h3>Tamanho</h3>
        <div className="size-options-wrapper">
          {getAllSizes().map((size) => (
            <div className="size-options">
                <label key={size} htmlFor={size} style={{borderColor: selectedSizes.includes(size) ? "#FB953E" : "#666666" , color: selectedSizes.includes(size) ? "#000000" : "#666666"}}>              
                {size}
              </label>
              <input
                type="checkbox"
                id={size}
                value={size}
                onChange={() => handleSizeChange(size)}
                checked={selectedSizes.includes(size)}                
              />
            </div>
          ))}
        </div>
      </div>

      {/* Faixa de Preço */}
      <div className="wrapper-filter-container filter-container-price">
        <h3>Faixa de Preço</h3>
        <div className="price-options-wrapper">
          {priceRanges.map((range) => (
            <label key={range.label} style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                name="priceRange"
                onChange={() => handlePriceRangeChange(range.range)}
                checked={isSameRange(selectedPriceRange, range.range)} 
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>
      
    </div> : <></>
  );
}

