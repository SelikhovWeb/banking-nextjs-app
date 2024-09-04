import { getLoggedInUser } from "@/lib/actions/user.actions";
import { makeAutoObservable, runInAction } from "mobx";

export class UserStore {
  loggedInUser: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadUser = async () => {
    try {
      const data = await getLoggedInUser();

      runInAction(() => {
        this.loggedInUser = data;
      });
    } catch (error) {
      console.error("Failed to load user:", error);
    }
  };
}

export const userStore = new UserStore();
