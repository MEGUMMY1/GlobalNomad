import { RegisterOptions } from 'react-hook-form';

export interface loginFormValues {
  email: string;
  password: string;
}
export interface signUpFormValues {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  agreement: boolean;
}

export type FormValues = loginFormValues | signUpFormValues;

export interface inputBoxProps {
  label?: string;
  type?: 'text' | 'password' | 'checkbox';
  placeholder: string;
  name: keyof (loginFormValues & signUpFormValues);
  validation?: RegisterOptions;
  register?: any;
  errors?: any;
  eyeIconActive?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
