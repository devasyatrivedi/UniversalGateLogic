import React from 'react';
import { Link } from 'wouter';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Digital Logic Virtual Lab</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/"><a className="hover:text-blue-200 font-medium">Home</a></Link></li>
            <li><a href="#" className="hover:text-blue-200 font-medium">Experiments</a></li>
            <li><a href="#" className="hover:text-blue-200 font-medium">Theory</a></li>
            <li><a href="#" className="hover:text-blue-200 font-medium">Help</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
