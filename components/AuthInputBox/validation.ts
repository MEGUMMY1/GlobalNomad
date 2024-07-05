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

export const signinValidation = {
  email: {
    required: '이메일을 입력해 주세요',
    pattern: {
      value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
      message: '이메일 형식으로 작성해 주세요.',
    },
  },
  nickName: {
    required: '닉네임을 입력해 주세요',
    maxLength: {
      value: 10,
      message: '10자 이하로 작성해 주세요.',
    },
  },
  password: {
    required: '비밀번호를 입력해 주세요',
    minLength: {
      value: 8,
      message: '8자 이상 작성해 주세요.',
    },
  },
  passwordCheck: {
    required: '비밀번호 확인란에 입력해 주세요',
  },
};
