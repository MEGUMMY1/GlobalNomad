import React from 'react';
import Footer from './Footer';
import { LayoutProps } from './Layout.types';
import NavigationBar from './NavigationBar';

/* 모바일 padding 설정이 없는 레이아웃 */
function LayoutMobile({ children }: LayoutProps) {
  return (
    <div className="w-full min-h-screen relative bg-var-gray1">
      <NavigationBar />
      <div className="flex items-center justify-center">
        <div className="relative w-[1200px] mb-40 t:px-[24px]">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default LayoutMobile;
