"use client";
import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { useRootStore } from "@/stores/storeContext";
import { observer } from "mobx-react-lite";
import React from "react";

const MyBanks = observer(() => {
  const { userStore, accountStore } = useRootStore();

  const { loadAccounts, accounts, account } = accountStore;
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
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Banks"
          subtext="Manage your connected banks and accounts."
        />
        <div className="space-y-6">
          <h2 className="header-2">Your cards</h2>
          <div className="flex flex-wrap gap-6">
            {accounts &&
              accounts.data.map((account: any) => (
                <BankCard
                  key={account.id}
                  account={account}
                  userName={`${loggedInUser.firstName} ${loggedInUser.lastName}`}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default MyBanks;
