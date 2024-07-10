import { useEffect, useRef } from 'react';

/* 드롭다운이나 팝오버의 요소 외부 클릭 시 닫히게 할 때 사용 
   사용 예시 - const popoverRef = useClickOutside<HTMLDivElement>(closePopover); */

function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return ref;
}

export default useClickOutside;
