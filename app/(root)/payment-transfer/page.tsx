"use client";
import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import { useRootStore } from "@/stores/storeContext";
import { observer } from "mobx-react-lite";
import React from "react";

const PaymentTransfer = observer(() => {
  const { userStore, accountStore } = useRootStore();

  const { accounts, loadAccounts } = accountStore;
  const { loadUser, loggedInUser } = userStore;

  React.useEffect(() => {
    if (!loggedInUser) {
      loadUser();
    }
  }, [loadUser, loggedInUser]);

  React.useEffect(() => {
    if (loggedInUser) {
      loadAccounts(loggedInUser?.$id!);
    }
  }, [loggedInUser, loadAccounts]);

  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Transfer money to your friends and family in a fast and secure way."
      />
      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accounts} />
      </section>
    </section>
  );
});

export default PaymentTransfer;
