import { ActivityDetail } from '@/components/Lander/BestActivities.type';
import { mainPageStateProps } from '@/components/Lander/Main.type';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const mainPageState = atom<mainPageStateProps>({
  key: 'mainPageState',
  default : {
    currentPage: 1,
    itemsPerPage: 8,
    selectedKategorie: '',
    selectedSorted: '',
    sortedName: '',
  },
  effects_UNSTABLE: [persistAtom],
})

interface mainPageKategorieStateProps {
  KategorieName: string;
}

export const mainPageKategorieState = atom<mainPageKategorieStateProps>({
  key: 'mainPageKategorieState',
  default: {
    KategorieName: '',
  },
  effects_UNSTABLE: [persistAtom],
})