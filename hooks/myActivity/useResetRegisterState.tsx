import { useResetRecoilState } from 'recoil';
import { KategoriedDropState } from '@/states/KategorieDropState';
import {
  addressState,
  bannerImageState,
  detailImageState,
  endTimeState,
  selectedDateState,
  startTimeState,
  timeSlotCountState,
  timeSlotState,
} from '@/states/registerState';

function useResetRegisterState() {
  const resetKategorie = useResetRecoilState(KategoriedDropState);
  const resetAddress = useResetRecoilState(addressState);
  const resetBannerImage = useResetRecoilState(bannerImageState);
  const resetDetailImage = useResetRecoilState(detailImageState);
  const resetSelectedDate = useResetRecoilState(selectedDateState);
  const resetTimeSlot = useResetRecoilState(timeSlotState);
  const resetTimeSlotCount = useResetRecoilState(timeSlotCountState);
  const resetStartTime = useResetRecoilState(startTimeState);
  const resetEndTime = useResetRecoilState(endTimeState);

  const resetAllStates = () => {
    resetKategorie();
    resetAddress();
    resetBannerImage();
    resetDetailImage();
    resetSelectedDate();
    resetTimeSlot();
    resetTimeSlotCount();
    resetStartTime();
    resetEndTime();
  };

  return resetAllStates;
}

export default useResetRegisterState;
