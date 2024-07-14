import React from 'react';
import Image from 'next/image';
import { PrimaryButton } from '@/components/Button/Button';
import { useRouter } from 'next/router';

export default function NonePage() {
  const router = useRouter();

  const handleToMain = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center flex-col mt-14 m:mt-10">
      <div className="w-[500px] m:w-[300px]">
        <Image src="/image/404.png" width={500} height={500} alt="notFound" />
        <PrimaryButton size="large" style="dark" onClick={handleToMain}>
          메인으로 이동
        </PrimaryButton>
      </div>
    </div>
  );
}
