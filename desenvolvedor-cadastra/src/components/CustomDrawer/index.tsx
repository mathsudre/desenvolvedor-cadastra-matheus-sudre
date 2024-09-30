import React, { useState } from 'react';
import './styles.css';

interface DrawerProps {
  title: string;
  triggerText?: string;
  children: React.ReactNode;
  triggerComponent?: React.ReactNode;
}

export default function CustomDrawer({title,triggerText,children,triggerComponent}: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDrawer() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button className="drawer-trigger" onClick={toggleDrawer}>
        {triggerText ? triggerText : triggerComponent}
      </button>
      {isOpen && <div className="drawer-overlay" onClick={toggleDrawer}></div>}
      <div className={`drawer-container ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>{title}</h2>
          <button className="drawer-close-button" onClick={toggleDrawer}>
            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 18.852L17.5547 1.00001" stroke="black"/>
            <line y1="-0.5" x2="25.2899" y2="-0.5" transform="matrix(0.711746 0.702437 -0.874311 0.485367 0 1.23547)" stroke="black"/>
            </svg>
          </button>
        </div>
        <div className="drawer-content">
          {children}
        </div>
      </div>
    </>
  );
}

