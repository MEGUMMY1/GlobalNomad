import { KategorieProps } from '@/components/KategorieDropdown/KategorieDropdown.type';
import { atom } from 'recoil';

export const KategoriedDropState = atom<KategorieProps>({
  key: 'KategorieDropState',
  default: {
    name: '',
  },
});