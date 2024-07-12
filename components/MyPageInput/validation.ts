export const validation = {
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
