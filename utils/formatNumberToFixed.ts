// 정수를 소수점 아래 한자리까지 표시하는 함수
export function formatNumberToFixed(
  value: number,
  decimalPlaces: number = 1
): string {
  return value.toFixed(decimalPlaces);
}
