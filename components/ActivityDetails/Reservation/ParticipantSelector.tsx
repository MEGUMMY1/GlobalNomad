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
    <div className="w-[120px] h-[40px] flex items-center mt-2 mb-6 rounded border border-var-gray2 border-solid">
      <button
        onClick={() => handleParticipantsChange(-1)}
        className="px-4 py-2 hover:bg-var-gray2"
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
        className="w-full h-full p-2 outline-none text-center"
      />
      <button
        onClick={() => handleParticipantsChange(1)}
        className="px-4 py-2 hover:bg-var-gray2"
      >
        +
      </button>
    </div>
  );
}
