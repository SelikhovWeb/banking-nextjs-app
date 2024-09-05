"use client";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount } from "@/lib/actions/bank.actions";
import RecentTransactions from "@/components/RecentTransactions";
import React from "react";
import { log } from "console";
import { Loader2 } from "lucide-react";
import { useRootStore } from "@/stores/storeContext";
import { observer } from "mobx-react-lite";

const Home = observer(({ searchParams: { id, page } }: SearchParamProps) => {
  const { userStore, accountStore } = useRootStore();

  const { loadAccounts, accounts, loadAccount, account } = accountStore;
  const { loadUser, loggedInUser } = userStore;

  const [appwriteItemId, setAppwriteItemId] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    loadUser();
  }, [loadUser]);

  React.useEffect(() => {
    if (loggedInUser) {
      loadAccounts(loggedInUser?.$id!);
    }
  }, [loggedInUser, loadAccounts]);

  React.useEffect(() => {
    const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId;
    setAppwriteItemId(appwriteItemId);
  }, [accounts, id]);

  React.useEffect(() => {
    if (appwriteItemId) loadAccount(appwriteItemId!);
  }, [appwriteItemId, loadAccount]);

  const FullPageLoading = () => (
    <div className="flex items-center justify-center h-full">
      <Loader2 size={64} className="text-black-2 animate-spin" />
    </div>
  );

  if (!loggedInUser) return <FullPageLoading />;

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            user={loggedInUser?.firstName || "Guest"}
            title="Welcome,"
            subtext="Access and manage your account and transactions."
          />

          <TotalBalanceBox
            accounts={accounts?.data}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        {accounts && account && (
          <RecentTransactions
            accounts={accounts.data}
            transactions={account.transactions}
            appwriteItemId={appwriteItemId || ""}
            page={parseFloat(page as string) || 1}
          />
        )}
      </div>
      {accounts && (
        <RightSidebar
          user={loggedInUser}
          transactions={account?.transactions}
          banks={accounts?.data?.slice(0, 2)}
        />
      )}
    </section>
  );
});

export default Home;
