export const validation = {
  title: {
    required: '제목을 입력해 주세요',
  },
  description: {
    required: '설명을 작성해 주세요',
  },
  price: {
    required: '체험 가격을 입력해 주세요',
    validate: (value: number) =>
      value > 0 ? true : '가격은 1원 이상부터 입력 가능합니다',
  },
  address: {
    required: '주소를 입력해 주세요',
  },
};
