import { addressState } from '@/states/registerState';
import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useRecoilState } from 'recoil';
import { ClosePopupProps } from './Popup.types';
import { CloseButtonBold } from '../Button/Button';

const style = {
  width: '400px',
  height: '600px',
};

const AddressPopup = ({ closePopup }: ClosePopupProps) => {
  const [address, setAddress] = useRecoilState(addressState);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    setAddress(fullAddress);
  };

  const handleClose = (state: string) => {
    if (state === 'FORCE_CLOSE') {
      closePopup();
    } else if (state === 'COMPLETE_CLOSE') {
      closePopup();
    }
  };

  return (
    <div className="flex items-center justify-center bg-black bg-opacity-70 fixed inset-0 z-50">
      <div className="flex flex-col items-end bg-var-gray2">
        <div className="flex items-center h-[30px]">
          <CloseButtonBold
            onClick={() => {
              handleClose('FORCE_CLOSE');
            }}
          />
        </div>
        <DaumPostcode
          style={style}
          autoClose
          onComplete={handleComplete}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

export default AddressPopup;
