"use client";
import { Button } from "./ui/button";
import { deleteTransaction } from "@/actions/transaction/delete";

const DeleteTransaction = ({ id }: { id: string }) => {
  return (
    <form action={deleteTransaction.bind(null, id)}>
      <Button variant="destructive" type="submit">
        Delete
      </Button>
    </form>
  );
};

export default DeleteTransaction;
