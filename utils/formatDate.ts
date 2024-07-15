// 날짜를 YYYY-MM-DD 형태로 바꾸는 함수
export const formatDate = (date: string): string => {
  const convertedDate = new Date(date);

  const year = convertedDate.getFullYear();
  const month = String(convertedDate.getMonth() + 1).padStart(2, '0');
  const day = String(convertedDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
