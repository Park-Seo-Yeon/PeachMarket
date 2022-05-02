import create from "zustand";

const useStore = create((set)=>({
  category :"0",
  setCategory:(input) => set({category:input}),
}));

export default useStore;