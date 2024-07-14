import { InputBoxProps } from './InputBox.types';

/*
	label: label은 optional입니다.
	type: 옵셔널이며 기본은 text입니다.
	placeholder: placeholder입니다.
	name: register의 필드 명입니다. 데이터를 담는 변수명 입니다.
	validation: 옵셔널이며 유효성 검사 조건을 담는 변수입니다.
	register, errors: 해당 input을 담는 리액트 훅 폼의 register와 errors객체를 넣어주세요.
*/

export default function InputBox({
  label = '',
  type = 'text',
  placeholder,
  name,
  validation = {},
  register,
  errors,
  readOnly = false,
}: InputBoxProps) {
  return (
    <div className="flex flex-col gap-[16px] relative">
      {label && (
        <label className="text-[24px] font-bold" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        className={`border ${errors[name] ? 'border-var-red2' : ''} py-[16px] px-[20px] rounded-md border-var-gray6`}
        type={type}
        placeholder={placeholder}
        {...register(name, { ...validation, readOnly })}
        readOnly={readOnly}
      />
      {/* 에러 메세지 */}
      {errors[name] && (
        <span className="text-[12px] text-var-red2">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}
