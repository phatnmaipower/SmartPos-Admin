import Admin from "./Admin";
export const actions = {
  editName: "editName",
};

export default interface MenuModalEventDetail {
  admin: Admin;
  action: string;
}
