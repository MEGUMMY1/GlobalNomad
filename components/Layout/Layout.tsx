import React from 'react';
import Footer from './Footer';
import { LayoutProps } from './Layout.types';
import NavigationBar from './NavigationBar';

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full min-h-screen relative">
      <NavigationBar />
      <div className="flex items-center justify-center">
        <div className="w-[1200px] mb-40">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
