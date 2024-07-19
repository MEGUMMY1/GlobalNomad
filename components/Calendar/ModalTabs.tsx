import React, { useState } from 'react';
import { ModalTabsProps } from './Calendar.types';

function ModalTabs({ labels, children }: ModalTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex space-x-4 mb-4 border-b-2 border-gray-300">
        {labels.map((label, index) => (
          <button
            key={index}
            className={`w-[72px] py-2 font-xl ${
              index === activeTab
                ? 'border-b-2 border-var-green2 text-var-green2 dark:border-var-gray2 dark:text-var-gray2 font-bold'
                : 'text-var-gray8'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <div>{children[activeTab]}</div>
    </div>
  );
}

export default ModalTabs;
