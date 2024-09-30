import React, { useEffect, useRef, useState } from 'react';
import { useIsDesktop } from '../../hook/useIsDesktop';
import CustomDrawer from '../CustomDrawer';
import FiltroMobile from '../FiltroMobile';
import { Product } from '../../App';

interface CustomSelectProps {
  options: string[];
  onSelect: (option: string) => void;
  products: Product[];
  setFilteredProducts: (products: Product[]) => void;
  setVisibleProducts: (products: Product[]) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onSelect, products,setVisibleProducts}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(options[0]); 
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isDesktop ? (
        <div className="container-custom-select" ref={dropdownRef}>
          <span className="container-order-by-title" onClick={toggleDropdown}>
            Ordenar por:
          </span>
          {isOpen && (
            <div className="container-order-by-select">
              {options.map((option) => (
                <div
                  key={option}
                  className={`option ${selected === option ? "selected" : ""}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
          
        <div className='wrapper-filter-orderby-mobile'>
            <div className='filter-drawer'>

          <CustomDrawer title="FILTRAR" triggerText="Filtrar">
              <FiltroMobile products={products} setVisibleProducts={setVisibleProducts}/>
          </CustomDrawer>
            </div> 

            <div className='orderby-drawer'>
              <CustomDrawer title="ORDERNAR" triggerText="Ordenar">
            <div className="container-order-by-select">
              {options.map((option) => (
                <div
                  key={option}
                  className={`option ${selected === option ? "selected" : ""}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </CustomDrawer>
            </div> 


          
        </div>      
      )}
    </>
  );
  
};

export default CustomSelect;
