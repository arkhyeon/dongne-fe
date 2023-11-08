import { create } from 'zustand';

export interface ConfirmType {
  title?: string;
  message: string;
  buttons?: string[];
}

export interface ToastType {
  id: number;
  content: string;
  type: string;
}

interface NotifyStoreType {
  toastList: ToastType[];
  confirm: ConfirmType;
  responseHandler: (value: boolean) => void;
}

export const useNotifyStore = create<NotifyStoreType>(() => ({
  toastList: [],
  confirm: { message: '' },
  responseHandler: () => false,
}));

export const DC = {
  alert: (content: string, type = 'info') =>
    useNotifyStore.setState(store => ({
      toastList: [...store.toastList, { id: Date.now(), content, type }],
    })),
  alertError: (content: string) =>
    useNotifyStore.setState(store => ({
      toastList: [...store.toastList, { id: Date.now(), content, type: 'error' }],
    })),
  alertInfo: (content: string) =>
    useNotifyStore.setState(store => ({
      toastList: [...store.toastList, { id: Date.now(), content, type: 'info' }],
    })),
  alertSuccess: (content: string) =>
    useNotifyStore.setState(store => ({
      toastList: [...store.toastList, { id: Date.now(), content, type: 'success' }],
    })),
  confirm: (message: string | ConfirmType) => {
    // message = { title<string>, message<string>, buttons<string[]>['확인', '취소'] }
    useNotifyStore.setState(() => ({
      confirm: typeof message === 'string' ? { message } : message,
    }));
    return new Promise<boolean>(res => {
      useNotifyStore.setState(prev => ({ ...prev, responseHandler: res }));
    });
  },
};

export const deleteAlert = (id: number) =>
  useNotifyStore.setState((store: NotifyStoreType) => ({
    toastList: store.toastList.filter(tl => tl.id !== id),
  }));
