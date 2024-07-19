import { inputBoxProps } from './AuthInputBox.types';
import Image from 'next/image';
import { useState } from 'react';

export default function AuthInputBox({
  label,
  type = 'text',
  placeholder,
  name,
  validation,
  register,
  errors,
  eyeIconActive = false,
  handleChange,
}: inputBoxProps) {
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEyeOpen(!isEyeOpen);
  };

  if (type === 'checkbox') {
    return (
      <div className="flex gap-[10px]">
        <input type="checkbox" id={name} onChange={handleChange} />
        <label htmlFor={name}>{placeholder}</label>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[8px] text-[16px] relative">
      <label htmlFor={name}>{label}</label>
      <div
        className={`${errors[name] ? 'border-red-500' : ''} border border-var-gray6 border-solid w-full py-[16px] px-[20px] rounded-md flex items-center relative`}
      >
        <input
          id={name}
          className="w-full border-none outline-none"
          type={isEyeOpen ? 'text' : type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
        {/* 비밀번호 보기 버튼 */}
        {eyeIconActive && (
          <button type="button" onClick={handleClick}>
            <Image
              width={24}
              height={24}
              src={
                isEyeOpen
                  ? '/icon/btn_visibility_on_.svg'
                  : '/icon/btn_visibility_off.png'
              }
              alt="비밀번호_확인_버튼"
            />
          </button>
        )}
      </div>
      {/* 에러 메세지 */}
      {errors[name] && (
        <span className="text-[12px] text-red-500">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}
