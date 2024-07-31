import { ViewedActivityProps } from '@/components/ViewedActivities/ViewedActivities.type';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const ViewedActivitiesState = atom<ViewedActivityProps[]>({
  key: 'ViewedActivitiesState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
