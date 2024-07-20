import styled from 'styled-components';

export const StyleWrapper = styled.div<{ darkMode: boolean }>`
  .fc {
    display: flex;
    flex-direction: column;
    height: 800px;
    overflow: hidden;
    z-index: 0;
    background-color: ${(props) => (props.darkMode ? '#282828' : '#ffffff')};
    color: ${(props) => (props.darkMode ? '#eee' : '#000000')};
  }

  .fc-daygrid-day {
    height: auto;
    overflow: hidden;
    position: relative;
  }
  .fc-scroller-harness {
    @media (max-width: 768px) {
      z-index: 0;
    }
  }

  .fc-daygrid-day-events {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 80px;
    overflow: hidden;

    @media (max-width: 768px) {
      height: 50px;
    }
  }

  .fc-daygrid-day-top {
    flex-direction: row;
  }

  .fc-event {
    border-radius: 4px;
    font-size: 12px;
    display: flex;
    align-items: center;
    padding-left: 8px;
    height: 24px;
    overflow: hidden;

    @media (max-width: 768px) {
      padding-left: 4px;
    }
  }

  .fc-event-inner {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
  }

  .bg-var-gray3 {
    background-color: #dddddd;
    border: none;
  }

  .text-var-gray8 {
    color: #4b4b4b;
  }

  .bg-var-orange1 {
    background-color: #fff4e8;
    border: none;
  }

  .text-var-orange2 {
    color: #ff7c1d;
  }

  .bg-var-blue3 {
    background-color: #0085ff;
    border: none;
  }

  .text-white {
    color: #fff;
  }

  .fc-toolbar {
    align-self: center;
    width: 300px;
    justify-content: space-between;
  }

  .fc-toolbar-title {
    font-size: 20px;
    font-weight: 700;
  }

  .fc-today-button {
    display: none;
  }

  .fc table {
    background-color: ${(props) => (props.darkMode ? '#282828' : '#fff')};
  }

  .fc-prev-button,
  .fc-next-button {
    background: none;
    border: none;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.darkMode ? '#eee' : '#1b1b1b')};
  }

  .fc-prev-button:before {
    content: '＜';
    font-size: 16px;
    font-weight: 700;
  }

  .fc-prev-button span {
    display: none;
  }

  .fc-next-button:before {
    content: '＞';
    font-size: 16px;
    font-weight: 700;
  }

  .fc-next-button span {
    display: none;
  }

  .fc-scroller {
    background-color: ${(props) => (props.darkMode ? '#282828' : '#fff')};
    border-color: ${(props) => (props.darkMode ? '#535353' : '#fff')};
    overflow: hidden;
    color: #969696;
  }

  .fc-daygrid-day-frame {
    background-color: ${(props) => (props.darkMode ? '#282828' : '#fff')};
    border-color: ${(props) => (props.darkMode ? '#535353' : '#fff')};
    overflow: hidden;
    color: #969696;
    font-size: 18px;
  }
`;
