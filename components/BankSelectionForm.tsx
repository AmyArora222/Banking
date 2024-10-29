// BankSelectionForm.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const banks = [
  { name: 'ICICI', logo: '/banks/icici.jpeg' },
  { name: 'HDFC', logo: '/banks/hdfc.png'  },
  { name: 'State Bank of India', logo: '/banks/sbi.png' },
  { name: 'Indian Bank', logo: '/banks/indian.png' },
  { name: 'Punjab National Bank', logo: '/banks/pnb.png' },
  { name: 'Axis', logo: '/banks/axis.jpeg' },
  { name: 'Bank of Baroda', logo: '/banks/bob.png' },
  { name: 'Canara Bank', logo: '/banks/canara.png' },
  { name: 'Indian Overseas Bank', logo: '/banks/indianoverseas.png' },
  { name: 'IDBI Bank', logo: '/banks/idbi.png' },
  { name: 'Union Bank of India', logo: '/banks/union.png' },
  { name: 'Central Bank of India', logo: '/banks/central.png' },
  
];

const BankSelectionForm = ({ onBankSelect }: { onBankSelect: (bank: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBanks = banks.filter(bank => 
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-100">
        <h2 className="text-lg font-semibold mb-4">Choose Bank</h2>
        <input
          type="text"
          placeholder="Search banks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 rounded-md p-2 mb-4 w-full"
        />
        <div className="overflow-auto h-80 mb-4">
          {filteredBanks.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredBanks.map(bank => (
                <div
                  key={bank.name}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => onBankSelect(bank.name)}
                >
                  <img src={bank.logo} alt={bank.name} className="h-20 w-20 mb-2" />
                  <span>{bank.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No banks found</p>
          )}
        </div>
        <div className="flex justify-center items-center">
        <Button onClick={() => onBankSelect('')} className="px-4 py-2 border border-gray-300 rounded-md text-sm">
          Cancel
        </Button>
        </div>
      </div>
    </div>
  );
};

export default BankSelectionForm;
