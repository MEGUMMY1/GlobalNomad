import { ChipsProps } from './Chips.types';

const statusClasses = {
  seat: { text: '잔여', bg: 'bg-white', textColor: 'text-var-blue3' },
  reservation: { text: '예약', bg: 'bg-var-blue3', textColor: 'text-white' },
  complete: { text: '완료', bg: 'bg-var-gray3', textColor: 'text-var-gray8' },
  confirmed: {
    text: '확정',
    bg: 'bg-var-orange1',
    textColor: 'text-var-orange2',
  },
};

/* 예약 현황 확인을 위한 Chips
  status, count 필수 입력
  status 옵션 - "seat" | "reservation" | "complete" | "confirmed"
  사용 예시 - <Chips status="seat" count={1} /> */
function Chips({ status, count }: ChipsProps) {
  return (
    <div
      className={`flex gap-[2px] w-[110px] text-[14px] px-[4px] py-[3px] rounded-[4px]
        ${statusClasses[status].bg} ${statusClasses[status].textColor} font-[500]
        t:w-[58px] m:w-[45px] m:text-[12px]`}
    >
      <p>{statusClasses[status].text}</p>
      <p>{count}</p>
    </div>
  );
}

export default Chips;
