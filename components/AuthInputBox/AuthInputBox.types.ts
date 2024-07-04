export interface FormValues {
  email: string;
  password: string;
  passwordCheck: string;
}

export interface InputBoxProps {
  label: string;
  type?: 'text' | 'password';
  placeholder: string;
  name: keyof FormValues;
  validation: any; // RegisterOptions 타입으로 수정
  register: any;
  errors: any;
  eyeIconActive?: boolean;
}
