import create from "zustand";

const useStore = create((set)=>({
  category :"0",
  setCategory:(input) => set({category:input}),

  userId : null,
  setUserId:(input) =>set({userId:input}),
}));

export default useStore;
