import create from "zustand";

const useStore = create((set) => ({
  changeCategory: "0",
  setChangeCategory: (input) => set({ changeCategory: input }),

  userId: "",
  setUserId: (input) => set({ userId: input }),

  userToken: "",
  setUserToken: (input) => set({ userToken: input }),

  userRefreshToken: "",
  setUserRefreshToken: (input) => set({ userRefreshToken: input }),

  isLoggedIn: false,
  setIsLoggedIn: (input) => set({ isLoggedIn: input }),

  fittingImg: "",
  setFittingImg: (input) => set({ fittingImg: input }),
}));

export default useStore;
