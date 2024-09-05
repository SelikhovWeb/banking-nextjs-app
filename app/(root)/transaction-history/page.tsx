"use client";
import HeaderBox from "@/components/HeaderBox";
import React from "react";
import { useSearchParams } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/stores/storeContext";
import { formatAmount } from "@/lib/utils";
import TransactionsTable from "@/components/TransactionsTable";
import { Pagination } from "@/components/Pagination";

const TransactionsHistory = observer(() => {
  const searchParams = useSearchParams();
  const { userStore, accountStore } = useRootStore();

  const { loadAccount, accounts, account } = accountStore;
  const { loadUser, loggedInUser } = userStore;

  const page = Number(searchParams.get("page")) || 1;
  const id = searchParams.get("id");

  React.useEffect(() => {
    if (id) loadAccount(id);
  }, [id, loadAccount]);

  // Pagination logic
  const rowsPerPage = 10;
  const totalPages = Math.ceil(account?.transactions?.length / rowsPerPage);
  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = account?.transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

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
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account?.data?.name}
            </h2>
            <p className="text-14 text-blue-25">
              {account?.data?.officialName}
            </p>
            <p className="text-14 font-semibold tracking-widest text-white">
              •••• •••• •••• {account?.data?.mask}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24  text-center font-bold">
              {formatAmount(account?.data?.currentBalance)}
            </p>
          </div>
        </div>
        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={currentTransactions} />
          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination page={page} totalPages={totalPages} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
});

export default TransactionsHistory;
