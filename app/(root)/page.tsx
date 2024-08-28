import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async () => {
  const loggedInUser = await getLoggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            user={loggedInUser?.name || "Guest"}
            title="Welcome1,"
            subtext="Access and manage your account and transactions."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        {/* RECENT TRANSACTIONS */}
      </div>
      <RightSidebar
        user={loggedInUser}
        transactions={[]}
        banks={[
          {
            currentBalance: 1250.35,
            mask: "1234",
          },
          {
            currentBalance: 1250.35,
            mask: "5678",
          },
        ]}
      />
    </section>
  );
};

export default Home;
