"use client";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccounts, getAccount } from "@/lib/actions/bank.actions";
import RecentTransactions from "@/components/RecentTransactions";
import React from "react";
import { log } from "console";
import { Loader2 } from "lucide-react";

const Home = ({ searchParams: { id, page } }: SearchParamProps) => {
  const [loggedInUser, setLoggedInUser] = React.useState<any | null>(null);
  const [accounts, setAccounts] = React.useState<any | null>(null);
  const [account, setAccount] = React.useState<any | null>(null);
  const [appwriteItemId, setAppwriteItemId] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await getLoggedInUser().catch((err) =>
        console.error(err, "Error fetching user")
      );
      setLoggedInUser(user);
    };

    fetchUser();
  }, []);

  React.useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await getAccounts({ userId: loggedInUser?.$id! }).catch(
        (err) => console.error(err, "Error fetching accounts")
      );
      setAccounts(accounts);
    };

    if (loggedInUser) fetchAccounts();
  }, [loggedInUser]);

  React.useEffect(() => {
    const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId;
    setAppwriteItemId(appwriteItemId);
  }, [accounts, id]);

  React.useEffect(() => {
    const fetchAccount = async (id: string) => {
      if (!id) return;
      const account = await getAccount({ appwriteItemId: id }).catch((err) =>
        console.error(err, "Error fetching account")
      );
      setAccount(account);
    };

    if (appwriteItemId) fetchAccount(appwriteItemId);
  }, [appwriteItemId]);

  console.log("loggedInUser:", loggedInUser);
  console.log("appwriteItemId:", appwriteItemId);
  console.log("account:", account);
  console.log("accounts:", accounts);

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
            page={1}
          />
        )}
      </div>
      {accounts && (
        <RightSidebar
          user={loggedInUser}
          transactions={accounts?.transactions}
          banks={accounts?.data?.slice(0, 2)}
        />
      )}
    </section>
  );
};

export default Home;
