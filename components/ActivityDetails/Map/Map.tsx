import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MapProps } from './Map.types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilValue } from 'recoil';
import { darkModeState } from '@/states/themeState';

export default function Map({ address }: MapProps) {
  const [distance, setDistance] = useState<string | null>(null);
  const isDarkMode = useRecoilValue(darkModeState);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const kakao = (window as any).kakao;

      kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);

        const geocoder = new kakao.maps.services.Geocoder();

        // 체험장소 주소를 좌표로 변환
        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const destinationLat = parseFloat(result[0].y);
            const destinationLon = parseFloat(result[0].x);
            const destinationCoords = new kakao.maps.LatLng(
              destinationLat,
              destinationLon
            );

            // 체험장소 마커 추가
            new kakao.maps.Marker({
              map: map,
              position: destinationCoords,
              title: '체험장소',
            });

            // 지도 중심을 체험장소로 이동
            map.setCenter(destinationCoords);

            // 현재 위치 가져오기 및 거리 계산
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const currentLat = position.coords.latitude;
                  const currentLon = position.coords.longitude;
                  const currentCoords = new kakao.maps.LatLng(
                    currentLat,
                    currentLon
                  );

                  // 현재 위치 마커 추가
                  new kakao.maps.Marker({
                    map: map,
                    position: currentCoords,
                    title: '현재 위치',
                  });

                  const distanceInMeters = calculateDistanceInMeters(
                    currentLat,
                    currentLon,
                    destinationLat,
                    destinationLon
                  );

                  setDistance(`${(distanceInMeters / 1000).toFixed(2)} km`);
                },
                (error) => {
                  console.error('현재 위치 가져오기 실패:', error);
                }
              );
            } else {
              console.error('Geolocation is not supported by this browser.');
            }
          } else {
            console.error('주소 검색 실패:', status);
          }
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [address]);

  // 거리 계산 함수 (단위: 미터)
  const calculateDistanceInMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success('주소가 복사되었습니다.');
      },
      (err) => {
        toast.error('클립보드 복사 실패');
      }
    );
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
      />
      <div className="flex gap-2 mb-2 items-center">
        <Image
          src="/icon/distance.svg"
          alt="위치 아이콘"
          width={20}
          height={20}
        />
        {distance ? (
          <p className="text-nomad-black dark:text-var-gray2 tracking-tight">
            현재 위치에서 체험 장소까지의 거리는 약 {distance} 입니다.
          </p>
        ) : (
          <p className="text-nomad-black dark:text-var-gray2 tracking-tight">
            거리를 계산 중입니다...
          </p>
        )}
      </div>
      <div
        id="map"
        className="w-[800px] h-[500px] rounded-2xl ipad-pro:h-[400px] t:w-full t:h-[276px] m:w-full m:h-[450px]"
      />
      <div className="flex gap-1 mt-2 items-center">
        <Image
          src="/icon/location.svg"
          alt="위치 아이콘"
          width={18}
          height={18}
        />
        <p className="text-nomad-black dark:text-var-gray2 text-sm max-w-[700px] tracking-tight">
          {address}
        </p>
        <button
          onClick={() => copyToClipboard(address)}
          className="text-var-blue3 underline ml-1 text-sm"
        >
          복사
        </button>
      </div>
    </div>
  );
}
