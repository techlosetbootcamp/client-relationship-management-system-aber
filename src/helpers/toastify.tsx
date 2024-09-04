import { toast as reactToast, Bounce } from 'react-toastify';

export const toast = {
  success: (data : string) => {
    return reactToast.success(data || 'Successful!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  },
  warning: (data:any) => {
    return reactToast.warn(data || 'Something went wrong', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  },
  error: (data: any) => {
    return reactToast.error(data || 'Something went wrong', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  },
};
