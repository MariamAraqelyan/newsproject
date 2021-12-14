export interface IOneSignal {
  push: (func: any) => any;
  init: (IInitParams) => any;
  showNativePrompt: () => any;
  isPushNotificationsEnabled: (func: any) => any;
  removeExternalUserId: () => any;
  setExternalUserId: (id: number) => any;
}

export interface IInitParams {
  appId: string;
  notifyButton: {
    enable: boolean;
  };
}
