"use client";
import HeaderBox from "@/components/HeaderBox";
import React from "react";
import { useSearchParams } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/stores/storeContext";

const TransactionsHistory = observer(() => {
  const { userStore } = useRootStore();

  console.log("userStore:", userStore);
  const searchParams = useSearchParams();
  const appwriteItemId = searchParams.get("id");

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transactions History"
          subtext="See your details and transactions history."
        />
      </div>
      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2"></div>
        </div>
      </div>
    </div>
  );
});

export default TransactionsHistory;
