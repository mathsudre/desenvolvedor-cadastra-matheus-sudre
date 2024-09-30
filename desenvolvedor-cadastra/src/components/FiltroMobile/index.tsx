import { useEffect, useState } from 'react';
import { Product } from '../../App';
import { useIsDesktop } from '../../hook/useIsDesktop';
import './styles.css';

interface FiltroDesktopType {
  products: Product[];  
  setVisibleProducts: (products: Product[]) => void;
}

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
}

const Disclosure = ({ title, children }: DisclosureProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="disclosure">
      <button
        className="disclosure-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="disclosure-arrow">
          <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L10 14L19 1.0135" stroke="#666666" stroke-linecap="round"/>
          </svg>
        </span>
      </button>
      {isOpen && <div className="disclosure-content">{children}</div>}
    </div>
  );
};

export default function FiltroMobile({ products, setVisibleProducts }: FiltroDesktopType) {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);  
  const [saveFiltered, setSaveFiltered] = useState<Product[]>([]); 
  const isDesktop = useIsDesktop();

  

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
      setVisibleProducts(products);
    } else {
      setVisibleProducts(
        products.filter((product) => selectedColors.includes(product.color))
      );
      setSaveFiltered(products.filter((product) => selectedColors.includes(product.color)))
    }
  }, [selectedColors, products, setVisibleProducts]);

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prevSelected) =>
      prevSelected.includes(size)
        ? prevSelected.filter((s) => s !== size)
        : [...prevSelected, size]
    );
  };

  useEffect(() => {
    if (selectedSizes.length === 0) {
      setVisibleProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.size.some((size) => selectedSizes.includes(size))
      );
      setVisibleProducts(filtered);
      setSaveFiltered(filtered)
    }
  }, [selectedSizes, products, setVisibleProducts]);

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
      setVisibleProducts(products);
    } else {
      const [minPrice, maxPrice] = selectedPriceRange;
      const filtered = products.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
      setVisibleProducts(filtered);
      setSaveFiltered(filtered)
    }
  }, [selectedPriceRange, products, setVisibleProducts]);

  
  const clearFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedPriceRange([]);
    setVisibleProducts(products);
    setSaveFiltered(products)
  };
  const applyFilters = () => {
    console.log(saveFiltered,"testeeee")
    setVisibleProducts(saveFiltered); 
  };

  return (
    
    !isDesktop ? <div className='container-filter-mobile'>

      <div className='wrapper-disclosures'>      
      <Disclosure title='CORES'>
        <div className="wrapper-filter-container filter-container-cor">      
          <div className="color-options">
            {colors.map((color) => (
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
        </div>
      </Disclosure>

      {/* Tamanho */}
      <Disclosure title='TAMANHOS'>

        <div className="wrapper-filter-container filter-container-size">        
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
      </Disclosure>      

      {/* Faixa de Preço */}
      <Disclosure title='FAIXA DE PREÇO'>
        <div className="wrapper-filter-container filter-container-price">        
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
      </Disclosure>
      </div>

      {/* Botão de limpar filtros */}
      <div className='wrapper-options-btn'>
        <button onClick={applyFilters}>Aplicar</button>
        <button onClick={clearFilters}>Limpar</button>
      </div>
    </div> : <></>
  );
}

