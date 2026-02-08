"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { updateTransaction } from "@/actions/transaction/update";
import { redirect } from "next/navigation";

interface Transaction {
  id: string;
  text: string;
  amount: number;
}

export const EditTransaction = ({
  transactions,
}: {
  transactions: Transaction;
}) => {
  console.log(transactions);
  const [text, setText] = useState<string>(transactions.text);
  const [amount, setAmount] = useState<number>(transactions.amount);

  const handleSubmit = async (formData: FormData) => {
    const { error } = await updateTransaction(formData);
    if (error) {
      console.error(error);
    } else {
      redirect("/");
    }
  };

  return (
    <div>
      <div>Transaction</div>
      <form action={handleSubmit} className="space-y-3">
        <input type="hidden" name="id" value={transactions.id} />
        <div className="flex flex-col space-y-2">
          <label htmlFor="">Text</label>
          <Input
            type="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex space-y-2 flex-col gap-2">
          <label htmlFor="">Amount</label>
          <Input
            type="number"
            name="amount"
            value={amount}
            step={0.01}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <Button variant="outline">Update</Button>
        </div>
      </form>
    </div>
  );
};
