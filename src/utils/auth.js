import { message } from 'antd';

export default {
  headers: (json = true) => {
    const token = localStorage.getItem('pityToken');
    // 这里跟作者不一样，属于错误修改
    const userRole = localStorage.getItem("pityUser")
    const headers = { token,userRole };
    // const headers = { token};
    if (json) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  },
  response: (res, info = false) => {
    if (res.code === 0) {
      if (info) {
        message.info(res.msg);
      }
      return true;
    }
    if (res.code === 401) {
      // 说明用户未认证
      message.info(res.msg);
      localStorage.setItem('pityToken', null);
      localStorage.setItem('pityUser', null);
      window.location.href = '/user/login';
    }
    message.error(res.msg);
    return false;
  },
};
