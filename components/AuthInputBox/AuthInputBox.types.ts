export interface loginFormValues {
  email: string;
  nickName: string;
  password: string;
  passwordCheck: string;
}

export interface inputBoxProps {
  label: string;
  type?: 'text' | 'password';
  placeholder: string;
  name: keyof loginFormValues;
  validation: any; // RegisterOptions 타입으로 수정
  register: any;
  errors: any;
  eyeIconActive?: boolean;
}
