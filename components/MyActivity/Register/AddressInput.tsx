import AddressPopup from '@/components/Popup/AddressPopup';
import { addressState } from '@/states/registerState';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

function AddressInput() {
  const address = useRecoilValue(addressState);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleInputClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <label
        className="text-[24px] font-bold block mb-[16px]"
        htmlFor="address"
      >
        주소
      </label>
      <input
        type="text"
        id="address"
        value={address}
        onClick={handleInputClick}
        className="w-full h-[56px] py-[8px] px-[16px] rounded-md border border-var-gray6 dark:border-var-dark3 bg-white dark:bg-var-dark2 dark:text-var-gray2"
        readOnly
        placeholder="주소"
      />
      {isPopupOpen && <AddressPopup closePopup={closePopup} />}
    </div>
  );
}

export default AddressInput;
