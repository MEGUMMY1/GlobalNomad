import { sideNavigationState } from '@/states/sideNavigationState';
import { useRecoilState } from 'recoil';

export const useSideNavigation = () => {
  const [isOpen, setIsOpen] = useRecoilState(sideNavigationState);

  const openSideNavigation = () => {
    setIsOpen(true);
  };

  const closeSideNavigation = () => {
    setIsOpen(false);
  };

  return { isOpen, openSideNavigation, closeSideNavigation };
};
