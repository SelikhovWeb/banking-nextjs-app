import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { makeAutoObservable, runInAction } from "mobx";

export class AccountStore {
  account: any = null;
  accounts: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadAccounts = async (userId: string) => {
    try {
      const data = await getAccounts({ userId });

      runInAction(() => {
        this.accounts = data;
      });
    } catch (error) {
      console.error("Failed to load accounts:", error);
    }
  };

  loadAccount = async (appwriteItemId: string) => {
    try {
      const data = await getAccount({ appwriteItemId });

      console.log("account111:", data);

      runInAction(() => {
        this.account = data;
      });
    } catch (error) {
      console.error("Failed to load account:", error);
    }
  };
}

export const accountStore = new AccountStore();
