import React, { forwardRef, useImperativeHandle } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LMToast = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    showToast(message, type) {
      toast[type](message);
    }
  }));

  return <ToastContainer
  position="top-right"
  autoClose={1000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  limit={3}
  rtl={false}
  draggable
  pauseOnHover
  theme="dark"
  />;
});

export default LMToast;
