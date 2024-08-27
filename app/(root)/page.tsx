import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = {
    firstName: "John",
    lastName: "Doe",
    email: "john.test@gmail.com",
  };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            user={loggedIn?.firstName || "Guest"}
            title="Welcome,"
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
        user={loggedIn}
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
