import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Digital Logic Virtual Lab</h2>
            <p className="text-slate-300">Learn digital electronics through interactive experiments</p>
          </div>
          <div>
            <p className="text-slate-300">&copy; {new Date().getFullYear()} Virtual Labs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
