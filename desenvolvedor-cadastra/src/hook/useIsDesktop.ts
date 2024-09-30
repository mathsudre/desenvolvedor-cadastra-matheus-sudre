import { useState, useEffect } from 'react';


export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    
    window.addEventListener('resize', handleResize);

    
    handleResize();

    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop;
}
