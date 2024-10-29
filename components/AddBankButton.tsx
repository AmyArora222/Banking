import React from 'react';

const AddBankButton: React.FC<{ onAddBank: () => void }> = ({ onAddBank }) => {
  return (
    <button onClick={onAddBank} className="flex gap-2">
      <img src="/icons/plus.svg" width={20} height={20} alt="plus" />
      <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
    </button>
  );
};

export default AddBankButton;
