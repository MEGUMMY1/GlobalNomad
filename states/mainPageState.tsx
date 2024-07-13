import { mainPageStateProps } from '@/components/Lander/Main.type';
import { atom } from 'recoil';

export const mainPageState = atom<mainPageStateProps>({
  key: 'mainPageState',
  default : {
    currentPage: 1,
    itemsPerPage: 9,
    selectedKategorie: '',
    selectedSorted: '',
  }
  
})