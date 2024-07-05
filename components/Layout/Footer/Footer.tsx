import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <div className="absolute bottom-0 w-full h-[160px] bg-nomad-black flex justify-center">
      <div className="w-[1200px] flex justify-between py-8 mx-12 m:grid m:grid-cols-2 m:mx-6 m:justify-center">
        <p className="text-[#676767]">©codeit - 2023</p>
        <div className="flex gap-8">
          <p className="text-[#676767]">Privacy Policy</p>
          <p className="text-[#676767]">FAQ</p>
        </div>
        <div className="flex w-[116px] h-[20px] justify-between">
          <Link href="https://www.facebook.com/" target="_blank">
            <Image
              src="/icon/facebook.svg"
              width={20}
              height={20}
              alt="facebook"
            />
          </Link>
          <Link href="https://www.x.com/" target="_blank">
            <Image
              src="/icon/twitter.svg"
              width={20}
              height={20}
              alt="twitter"
            />
          </Link>
          <Link href="https://www.youtube.com/" target="_blank">
            <Image
              src="/icon/youtube.svg"
              width={20}
              height={20}
              alt="youtube"
            />
          </Link>
          <Link href="https://www.instagram.com/" target="_blank">
            <Image
              src="/icon/instagram.svg"
              width={20}
              height={20}
              alt="instagram"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
