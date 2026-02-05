"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Transaction {
  text: string;
  amount: number;
}

const AddTransaction = () => {
  const [transaction, setTransaction] = useState<Transaction>({
    text: "",
    amount: 0,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(transaction);
    const res = await fetch("/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    if (!res.ok) {
      console.error("Failed to save transaction");
      return;
    }

    setTransaction({
      text: "",
      amount: 0,
    });
  };

  return (
    <div>
      <div>Transaction</div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col  space-y-2">
          <label htmlFor="">Text</label>
          <Input
            type="text"
            name="text"
            value={transaction.text}
            onChange={(e) =>
              setTransaction({ ...transaction, text: e.target.value })
            }
          />
        </div>
        <div className="flex space-y-2 flex-col gap-2">
          <label htmlFor="">Amount</label>
          <Input
            type="number"
            name="amount"
            value={transaction.amount}
            onChange={(e) =>
              setTransaction({ ...transaction, amount: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <Button variant="outline">Button</Button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
