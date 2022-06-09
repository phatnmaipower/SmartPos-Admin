import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import Admin from "@/types/AdminPage/Admin";

// define your typings for the store state
export interface State {
  myURL: string;
  admin: Admin;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    myURL: "http://localhost:8080",
    admin: {
      id: "628b2ded9a114b6464fff78e",
      password: "12345",
      name: "Mabel Guy",
      email: "mabelguy@cinesanct.com",
      role: "マスター管理者",
      lastLogin: 1653288429671,
      img: "https://res.cloudinary.com/ngo-minh-phat/image/upload/v1653964510/SmartPos_Test/avt_g7urwp.svg",
      type: "inviting",
    },
  },
});
