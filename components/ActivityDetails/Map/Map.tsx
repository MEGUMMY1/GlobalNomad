import React, { useEffect } from 'react';
import { MapProps } from './Map.types';
import { appKey } from '@/static/appKey';

export default function Map({ address }: MapProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`;
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

        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });

            map.setCenter(coords);
          }
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [address]);

  return (
    <div
      id="map"
      className="w-[800px] h-[500px] rounded-2xl ipad-pro:h-[400px] t:w-full t:h-[276px] m:w-full m:h-[450px]"
    />
  );
}
