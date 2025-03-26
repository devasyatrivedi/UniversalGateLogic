import React from 'react';
import { Link } from 'wouter';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Digital Logic Virtual Lab</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-blue-200 font-medium">Home</Link></li>
            <li><Link href="#experiments" className="hover:text-blue-200 font-medium">Experiments</Link></li>
            <li><Link href="#theory" className="hover:text-blue-200 font-medium">Theory</Link></li>
            <li><Link href="#help" className="hover:text-blue-200 font-medium">Help</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
