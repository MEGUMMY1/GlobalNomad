import { addressState } from '@/states/registerState';
import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useRecoilState } from 'recoil';
import { AddressPopupProps } from './Popup.types';

const style = {
  width: '400px',
  height: '600px',
};

const AddressPopup = ({ closePopup }: AddressPopupProps) => {
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
      <DaumPostcode
        style={style}
        autoClose
        onComplete={handleComplete}
        onClose={handleClose}
      />
    </div>
  );
};

export default AddressPopup;
