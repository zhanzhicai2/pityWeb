import {getGithubUser, loginGithub, query as queryUsers} from '@/services/user';
import {history} from 'umi';
import {getPageQuery} from "@/utils/utils";
import {message} from "antd";

const client_id = `Ov23liVwVosaCVRmkjg2`;
const key = `490e04ca7426209c0b43b4ae4884a70e01c7c785`;

const UserModel = {
    namespace: 'user',
    state: {
      currentUser: {},
    },
    effects: {
      * fetch(_, {call, put}) {
        const response = yield call(queryUsers);
        yield put({
          type: 'save',
          payload: response,
        });
      },
      * getGithubToken({payload}, {call, put}) {
        const response = yield call(loginGithub, payload)
        if (response.code == 0) {
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          message.success('🎉 🎉 🎉  登录成功！');
          yield put({
            type: 'login/changeLoginStatus',
            payload: response,
          }); // Login successfully
          yield put({
            type: 'fetchCurrent',
          })


          let {redirect} = params;

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
      } else {
        message.error(response.msg);
      }
    },

    * fetchCurrent(_, {call, put}) {
      // const response = yield call(queryCurrent);
      const token = localStorage.getItem("pityToken")
      const userInfo = localStorage.getItem("pityUser")
      if (!token || !userInfo) {
        history.push("/user/login");
        return;
      }
      const info = JSON.parse(userInfo)
      yield put({
        type: 'saveCurrentUser',
        // payload: response,
        payload: info,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action)
{
  return {...state, currentUser: action.payload || {}};
}
,

changeNotifyCount(
  state = {
    currentUser: {},
  },
  action,
)
{
  return {
    ...state,
    currentUser: {
      ...state.currentUser,
      notifyCount: action.payload.totalCount,
      unreadCount: action.payload.unreadCount,
    },
  };
}
,
},
}
;
export default UserModel;
