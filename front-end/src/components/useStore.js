import create from "zustand";

const useStore = create((set)=>({
  category :"0",
  setCategory:(input) => set({category:input}),

  userId : "",
  setUserId:(input) =>set({userId:input}),

  userToken : "",
  setUserToken:(input) =>set({userToken:input}),

  
  isLoggedIn : false,
  setIsLoggedIn:(input) =>set({isLoggedIn:input}),
}));

export default useStore;
