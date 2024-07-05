export const loginValidation = {
  email: {
    required: '이메일을 입력해 주세요',
    pattern: {
      value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
      message: '이메일 형식으로 작성해 주세요.',
    },
  },
  password: {
    required: '비밀번호를 입력해 주세요',
    minLength: {
      value: 8,
      message: '8자 이상 작성해 주세요.',
    },
  },
};
