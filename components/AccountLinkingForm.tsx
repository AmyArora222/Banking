// AccountLinkingForm.tsx
'use client';

import React,{useState} from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation'; 

const accountLinkingSchema = z.object({
  accountNumber: z.string().min(1, 'Account number is required'),
  ifsc: z.string().min(1, 'IFSC code is required'),
});

const AccountLinkingForm = ({ onLinkAccount }: { onLinkAccount: (data: any) => void }) => {
  const form = useForm({
    resolver: zodResolver(accountLinkingSchema),
    defaultValues: {
      accountNumber: '',
      ifsc: '',
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  

  const onSubmit = (data: any) => {
    setLoading(true);
    onLinkAccount(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Account Number</label>
        <input {...form.register('accountNumber')} className="border rounded-md w-full p-2" />
        {form.formState.errors.accountNumber && (
          <p className="text-red-600">{form.formState.errors.accountNumber.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1">IFSC Code</label>
        <input {...form.register('ifsc')} className="border rounded-md w-full p-2" />
        {form.formState.errors.ifsc && (
          <p className="text-red-600">{form.formState.errors.ifsc.message}</p>
        )}
      </div>
      <Button type="submit"  className="form-btn">
        Link Account
      </Button>
    </form>
    
    
  );
};

export default AccountLinkingForm;
