export interface ApiInfo {
  method: string;
  endpoint: string;
  params: string[];
}

export interface Admins {
  getListAdmins: ApiInfo;
  getListAdminsExisting: ApiInfo;
  getListAdminsInviting: ApiInfo;
  agreeTermsAndConditions: ApiInfo;
  updateCurrentAdminAvatar: ApiInfo;
  changeTemporaryPassword: ApiInfo;
  newAdminConfirmInvitation: ApiInfo;
  connectToXID: ApiInfo;
  updateCurrentEmail: ApiInfo;
  updateCurrentAdminFullName: ApiInfo;
  inviteAdmin: ApiInfo;
  loginAdmin: ApiInfo;
  loginAdminByXID: ApiInfo;
  getCurrentAdminProfile: ApiInfo;
  updateCurrentAdminPassword: ApiInfo;
  getAdminInformation: ApiInfo;
  deleteAdmin: ApiInfo;
  updateAdminAvatar: ApiInfo;
  updateAdminEmail: ApiInfo;
  updateAdminFullName: ApiInfo;
  reInviteAdmin: ApiInfo;
  resetAdminPassword: ApiInfo;
  updateAdminRole: ApiInfo;
}

export interface ApiI {
  host: string;
  admins: Admins;
}
