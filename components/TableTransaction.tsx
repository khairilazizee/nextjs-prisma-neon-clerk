import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";
import { prisma } from "@/lib/db";
import DeleteTransaction from "./DeleteTransaction";
import { Delete } from "lucide-react";

const TableTransaction = async () => {
  const user = await checkUser();
  if (!user) {
    return <div>Please login</div>;
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: user.clerkUserId,
    },
  });
  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-2">
        <div>Transaction Lists</div>
        <Link href="/transaction/add">
          <Button variant="outline">Add Transaction</Button>
        </Link>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.text}</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Paypal</TableCell>
              <TableCell className="text-right">{transaction.amount}</TableCell>
              <TableCell className="text-right flex flex-row gap-2">
                <Link href={`/transaction/${transaction.id}/edit`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <DeleteTransaction id={transaction.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableTransaction;
