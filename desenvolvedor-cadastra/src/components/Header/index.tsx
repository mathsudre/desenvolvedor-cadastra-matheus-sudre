import { Product } from "../../App";
import Minicart from "../Minicart";

interface HeaderProps {
  miniCartProducts: Product[];
  setMiniCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function Header({ miniCartProducts, setMiniCartProducts }: HeaderProps) {
  return (
    <header className="container-header">
      <div className="sub-container-header">
        <a href="/" target="_self" rel="noopener noreferrer">
          <img src="logo-cadastra.png" alt="logo-cadastra" />
        </a>
        <Minicart miniCartProducts={miniCartProducts} setMiniCartProducts={setMiniCartProducts} />
      </div>
    </header>
  );
}
