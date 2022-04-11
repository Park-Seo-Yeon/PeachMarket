import create from "zustand";

const useStore = create((set)=>({
  category :"전체",
  setCategory:(input) => set({category:input}),
}));

export default useStore;