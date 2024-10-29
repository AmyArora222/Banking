import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { formatAmount, formatDateTime, getTransactionStatus } from "@/lib/utils";

const TransactionsTable = ({ transactions }: { transactions: any[] }) => {
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Name</TableHead>
          <TableHead className="px-2">Amount (₹)</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t) => {
          const name = t.name
          const status = t.status; // Use status from the database
          const amount = formatAmount(t.amount) // Format the amount

          return (
            <TableRow key={t.$id}>
              <TableCell className="pl-2">{t.name}</TableCell>
              <TableCell className="pl-2">{amount}</TableCell>
              <TableCell className="pl-2">{status}</TableCell>
              <TableCell className="pl-2">{formatDateTime(new Date(t.date)).dateTime}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
