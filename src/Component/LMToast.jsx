import React, { forwardRef, useImperativeHandle } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LMToast = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    showToast(message, type) {
      toast[type](message);
    }
  }));

  return <ToastContainer />;
});

export default LMToast;
