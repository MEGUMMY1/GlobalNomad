import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from '@tanstack/react-query';
import { getMyMonthSchedule } from '@/pages/api/myActivities/apimyActivities';
import Spinner from '../Spinner/Spinner';
import { CalendarProps } from './Calendar.types';
import { getMyMonthScheduleResponse } from '@/pages/api/myActivities/apimyActivities.types';
import { StyleWrapper } from './StyleWrapper';
import { useModal } from '@/hooks/useModal';
import ReservationModalContent from './ReservationModalContent';
import { DateClickArg } from '@fullcalendar/interaction';

const Calendar: React.FC<CalendarProps> = ({ activityId }) => {
  const year = new Date().getFullYear().toString();
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0');

  const { data, error, isLoading } = useQuery<
    getMyMonthScheduleResponse[],
    Error
  >({
    queryKey: ['myMonthSchedule', activityId, year, month],
    queryFn: () => getMyMonthSchedule({ activityId, year, month }),
  });

  const { openModal, closeModal } = useModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState<Date | null>(null);

  const handleDateClick = (arg: DateClickArg) => {
    setModalDate(new Date(arg.dateStr));
    setIsModalOpen(true);
    openModal({
      title: '예약 정보',
      hasButton: false,
      content: modalDate && (
        <ReservationModalContent
          selectedDate={modalDate}
          activityId={activityId}
        />
      ),
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const events =
    data?.flatMap((item: getMyMonthScheduleResponse) => {
      const { date, reservations } = item;

      const events = [];

      if (reservations.completed > 0) {
        events.push({
          title: `완료 ${reservations.completed}`,
          start: date,
          classNames: ['bg-var-gray3 text-var-gray8'],
        });
      }

      if (reservations.pending > 0) {
        events.push({
          title: `예약 ${reservations.pending}`,
          start: date,
          classNames: ['bg-var-blue3 text-white'],
        });
      }

      if (reservations.confirmed > 0) {
        events.push({
          title: `승인 ${reservations.confirmed}`,
          start: date,
          classNames: ['bg-var-orange1 text-var-orange2'],
        });
      }

      return events;
    }) || [];

  return (
    <StyleWrapper>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
        headerToolbar={{
          start: 'prev',
          center: 'title',
          end: 'next',
        }}
        dateClick={handleDateClick}
      />
    </StyleWrapper>
  );
};

const renderEventContent = (eventInfo: {
  timeText: string;
  event: { title: string; classNames: string[] };
}) => {
  const { title, classNames } = eventInfo.event;

  return (
    <div className={`fc-event-inner ${classNames.join(' ')}`}>
      <b>{eventInfo.timeText}</b>
      <div className="event-labels">{title}</div>
    </div>
  );
};

export default Calendar;
