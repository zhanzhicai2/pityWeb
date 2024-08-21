import { stringify } from 'querystring';
import { history } from 'umi';
import {fakeAccountLogi, login, register} from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import {CONFIG} from "@/consts/config";
// import login from "@/pages/User/login";
// import {CONFIG} from "@/consts/config";
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *register({payload},{call,_}){
      const response = yield call(register,{
        username:payload.username,
        password:payload.password,
        name:payload.name,
        email:payload.email,
      });
      if (response.code !== 0){
        message.error(response.msg);
        return;
      }
      payload.setType('account');
      // 注意，这里的setType就是index.js中的setType方法，因为dispatch不返回结果，
      // 所以我们把改变状态的方法传入，在effects中进行改变
      message.success(response.msg);
    },
    *login({ payload }, { call, put }) {
      // const response = yield call(fakeAccountLogin, payload);
      // const response = yield call(login, payload);  // new 8.19
      const response = yield call(login, payload);  // new 8.19

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      // if (response.status === 'ok') {
      if (response.code === 0 ) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
      else {
        message.error(response.msg);
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      localStorage.setItem("pityToken", payload.data.token);
      localStorage.setItem("pityUser",JSON.stringify(payload.data.user));

      setAuthority(CONFIG.ROLE[payload.data.user.role]);

      // return { ...state, status: payload.status, type: payload.type };
      return {...state, status: payload.code === 0 ? 'ok':'error',type:payload.type};
      // return {...state, status: payload.code === 0 ? 'ok':'error',type:'account'};

    },
  },
};
export default Model;
