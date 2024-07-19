import { FieldValues, useForm } from 'react-hook-form';
import { PrimaryButton } from '../Button/Button';
import InputBox from '../InputBox/InputBox';
import { validation } from './validation';
import hamburgerIcon from '@/public/icon/hamburger_black.svg';
import hamburgerWhiteIcon from '@/public/icon/hamburger_white.svg';
import { useEffect, useMemo, useState } from 'react';
import useEditMyInfo from '@/hooks/useEditMyInfo';
import { useUserData } from '@/hooks/useUserData';
import Image from 'next/image';
import useUploadProfile from '@/hooks/useUploadProfile';
import { ProfileImageResponse } from '@/pages/api/users/apiUser.types';
import profileThumbnail from '@/public/image/profile-circle-icon-512x512-zxne30hp.png';
import editProfileIcon from '@/public/image/btn.png';
import { useSideNavigation } from '@/hooks/useSideNavigation';
import Spinner from '../Spinner/Spinner';
import { useRecoilState } from 'recoil';
import { darkModeState } from '@/states/themeState';

export default function MyPageInput() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({ mode: 'all' });

  const { openSideNavigation } = useSideNavigation();

  const { userData, isLoading } = useUserData();

  const { postProfileImgMutation } = useUploadProfile();
  const { postMyInfoMutation } = useEditMyInfo();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(
    userData?.profileImageUrl
  );

  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);

  const onSubmit = (data: FieldValues) => {
    const { nickname, password, passwordCheck } = data;
    if (password === passwordCheck) {
      const newPassword = password;
      postMyInfoMutation.mutate({ nickname, newPassword });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      postProfileImgMutation.mutate(formData, {
        onSuccess: (response: ProfileImageResponse) => {
          setProfileImageUrl(response.profileImageUrl);
          postMyInfoMutation.mutate({
            profileImageUrl: response.profileImageUrl,
          });
        },
        onError: (error) => {
          console.error('데이터를 불러오는데 실패했습니다.', error);
        },
      });
    }
  };

  useEffect(() => {
    if (userData?.profileImageUrl) {
      setProfileImageUrl(userData.profileImageUrl);
    }
  }, [userData?.profileImageUrl]);

  useEffect(() => {
    if (userData) {
      setValue('nickname', userData.nickname);
      setValue('email', userData.email);
    }
  }, [userData, setValue]);

  const { email, nickname, password, passwordCheck } = watch();

  const isNotError =
    !errors.email &&
    !errors.nickname &&
    !errors.password &&
    !errors.passwordCheck;

  const isFormFilled = !!email && !!nickname && !!password && !!passwordCheck;

  const isAllFieldsValid = isFormFilled && isNotError;

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col w-[792px] h-[564px] t:w-[429px] t:h-[556px] m:w-full m:h-full m:pb-[150px] m:px-[16px] ">
      <form className="flex flex-col gap-[24px] t:gap-[16px]">
        <div className="flex m:gap-[15px] p:justify-between t:justify-between">
          <Image
            src={isDarkMode ? hamburgerWhiteIcon : hamburgerIcon}
            alt="햄버거 메뉴 아이콘"
            className="p:hidden t:hidden"
            onClick={() => openSideNavigation()}
          />
          <p className="font-bold text-[32px]">내 정보</p>
          <div className="flex items-center m:hidden">
            <PrimaryButton
              style={
                isAllFieldsValid ? (isDarkMode ? 'bright' : 'dark') : 'disabled'
              }
              size="small"
              onClick={handleSubmit(onSubmit)}
              disabled={!isAllFieldsValid}
            >
              저장하기
            </PrimaryButton>
          </div>
        </div>
        <div className="w-fill flex justify-center p:hidden t:hidden">
          <label htmlFor="upload-image" className="cursor-pointer">
            <div className="w-[160px] relative">
              <Image
                src={profileImageUrl ? profileImageUrl : profileThumbnail}
                width={160}
                height={160}
                className="rounded-full w-[160px] h-[160px] "
                alt="유저 프로필 사진"
              />
              <Image
                src={editProfileIcon}
                className="w-[44px] h-[44px] absolute bottom-[-5px] right-[10px]  "
                alt="유저 프로필 사진 수정"
              />
              <input
                id="upload-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </label>
        </div>
        <div className="flex flex-col gap-[25px]">
          <div>
            <InputBox
              label="닉네임"
              placeholder=""
              name="nickname"
              validation={validation.nickName}
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputBox
              label="이메일"
              placeholder=""
              name="email"
              register={register}
              errors={errors}
              readOnly
            />
          </div>
          <div>
            <InputBox
              label="비밀번호"
              placeholder="8자 이상 입력해 주세요"
              name="password"
              validation={validation.password}
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputBox
              label="비밀번호 재입력"
              placeholder="비밀번호를 한번 더 입력해 주세요"
              name="passwordCheck"
              validation={{
                ...validation.passwordCheck,
                validate: (value: string) =>
                  value === watch().password || '비밀번호가 일치하지 않습니다.',
              }}
              register={register}
              errors={errors}
            />
          </div>
          <div className="mt-[30px] flex items-center p:hidden t:hidden">
            <PrimaryButton
              style={isAllFieldsValid ? 'dark' : 'disabled'}
              size="large"
              onClick={handleSubmit(onSubmit)}
              disabled={!isAllFieldsValid}
            >
              저장하기
            </PrimaryButton>
          </div>
        </div>
      </form>
    </div>
  );
}
