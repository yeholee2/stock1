import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-toss-gray/30 flex justify-center text-toss-text">
      {/* 
        On Desktop (lg), allow full width max-w-7xl.
        On Mobile, keep it 100% width.
      */}
      <div className="w-full lg:max-w-[1400px] bg-white min-h-screen shadow-xl relative overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
};