import { useResetRecoilState } from 'recoil';
import { KategoriedDropState } from '@/states/KategorieDropState';
import {
  addressState,
  bannerImageState,
  detailImageState,
  scheduleState,
  selectedDateState,
  timeSlotCountState,
} from '@/states/registerState';

function useResetRegisterState() {
  const resetKategorie = useResetRecoilState(KategoriedDropState);
  const resetAddress = useResetRecoilState(addressState);
  const resetBannerImage = useResetRecoilState(bannerImageState);
  const resetDetailImage = useResetRecoilState(detailImageState);
  const resetSelectedDate = useResetRecoilState(selectedDateState);
  const resetTimeSlotCount = useResetRecoilState(timeSlotCountState);
  const resetSchedule = useResetRecoilState(scheduleState);

  const resetAllStates = () => {
    resetKategorie();
    resetAddress();
    resetBannerImage();
    resetDetailImage();
    resetSelectedDate();
    resetTimeSlotCount();
    resetSchedule();
  };

  return resetAllStates;
}

export default useResetRegisterState;
