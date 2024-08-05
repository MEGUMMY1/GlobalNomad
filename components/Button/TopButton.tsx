import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();
  const isActivityDetailPage = router.pathname.startsWith('/activity-details/');

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    const ShowButtonClick = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', ShowButtonClick);
    return () => {
      window.removeEventListener('scroll', ShowButtonClick);
    };
  }, []);
  return (
    <>
      {showButton && (
        <div
          className="fixed z-30"
          style={{
            bottom: isActivityDetailPage ? '70px' : '30px',
            right: isActivityDetailPage ? '13px' : '30px',
          }}
        >
          <button
            onClick={scrollToTop}
            type="button"
            className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-nomad-black border-[3px] border-solid border-var-gray1 dark:bg-var-dark2 dark:border-var-dark3"
          >
            <Image
              src="/icon/chevron_up_white.png"
              alt="화살표"
              width={26}
              height={26}
            />
          </button>
        </div>
      )}
    </>
  );
};

export default TopButton;
