import React from 'react';
import { ParticipantSelectorProps } from './Reservation.types';

export default function ParticipantSelector({
  participants,
  onParticipantsChange,
}: ParticipantSelectorProps) {
  const handleParticipantsChange = (delta: number) => {
    onParticipantsChange(delta);
  };

  return (
    <div className="w-[120px] h-[40px] flex items-center mt-2 mb-6 rounded border dark:bg-var-dark4 border-var-gray2 dark:border-none border-solid">
      <button
        onClick={() => handleParticipantsChange(-1)}
        className="px-4 py-2 hover:bg-var-gray2 dark:hover:bg-var-gray7"
      >
        -
      </button>
      <input
        type="text"
        value={participants}
        onChange={(e) =>
          onParticipantsChange(Math.max(1, parseInt(e.target.value)))
        }
        min="1"
        className="w-full h-full p-2 outline-none text-center dark:bg-var-dark4"
      />
      <button
        onClick={() => handleParticipantsChange(1)}
        className="px-4 py-2 hover:bg-var-gray2 dark:hover:bg-var-gray7"
      >
        +
      </button>
    </div>
  );
}
