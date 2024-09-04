"use client";
import React, { createContext, ReactNode, useContext } from "react";
import { UserStore, userStore } from "./UserStore";
import { TransactionStore, transactionStore } from "./TransactionStore";
import { AccountStore, accountStore } from "./AccountStore";

class RootStore {
  userStore: UserStore;
  transactionStore: TransactionStore;
  accountStore: AccountStore;

  constructor() {
    this.userStore = userStore;
    this.transactionStore = transactionStore;
    this.accountStore = accountStore;
  }
}

// holds a reference to the store (singleton)
let store: RootStore;

// create the context
const StoreContext = createContext<RootStore | undefined>(undefined);

// create the provider component
export function RootStoreProvider({ children }: { children: ReactNode }) {
  //only create the store once ( store is a singleton)
  const root = store ?? new RootStore();

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
}

// create the hook
export function useRootStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useRootStore must be used within RootStoreProvider");
  }

  return context;
}
