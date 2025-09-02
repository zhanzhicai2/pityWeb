import { deleteUsers,listUserActivities,updateUsers,
  listUsers, loginGithub, listUserOperationLog, queryCurrent,updateAvatar} from '@/services/user';
import {history} from 'umi';
import {getPageQuery} from "@/utils/utils";
import {message} from "antd";
import auth from "@/utils/auth";

const client_id = `Ov23liVwVosaCVRmkjg2`;
const key = `490e04ca7426209c0b43b4ae4884a70e01c7c785`;
const getUserMap = data => {
  const temp = {}
  const userNameMap = {}
  data.forEach(item => {
    temp[item.id] = item
    userNameMap[item.id] = item.name
  })
  return {userMap: temp, userNameMap};
}

const UserModel = {
    namespace: 'user',
    state: {
      currentUser: {},
      userList: [],
      currentUserList: [],
      userMap: {},
      userNameMap: {},
      // 用户活动轨迹数据
      activities: [],
      operationLog: [],
    },
    effects: {
      // * fetch(_, {call, put}) {
      //   const token = localStorage.getItem("pityToken")
      //   const response = yield call(queryCurrent, {token});
      //   yield put({
      //     type: 'save',
      //     payload: response,
      //   });
      // },

      * fetchUserRecord({payload}, {call, put}) {
        const res = yield call(listUserOperationLog, payload);
        if (auth.response(res)) {
          yield put({
            type: 'save',
            payload: {
              operationLog: res.data,
            }
          })
        }
      },
      * fetchUserActivities({payload}, {call, put}) {
        const res = yield call(listUserActivities, payload);
        if (auth.response(res)) {
          yield put({
            type: 'save',
            payload: {
              activities: res.data,
            }
          })
        }
      },

      * updateUser({payload}, {call, put}) {
        const response = yield call(updateUsers, payload);
        return auth.response(response, true);
      },

      * deleteUser({payload}, {call, put}) {
        const response = yield call(deleteUsers, payload);
        return auth.response(response, true);
      },

      * fetchUserList(_, {call, put}) {
        const response = yield call(listUsers);
        const {userMap, userNameMap} = getUserMap(response);
        yield put({
          type: 'save',
          payload: {
            userList: response,
            currentUserList: response,
            userMap,
            userNameMap
          },
        });
      },

      * getGithubToken({payload}, {call, put}) {
        const response = yield call(loginGithub, payload)
        if (response.code === 0) {
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

      * avatar({payload}, {call, put}) {
        const res = yield call(updateAvatar, payload)
        if (auth.response(res, true)) {
          const pityUser = localStorage.getItem("pityUser")
          const info = JSON.parse(pityUser)
          info.avatar = res.data;
          localStorage.setItem("pityUser", JSON.stringify(info))
          yield put({
            type: 'saveCurrentUser',
            payload: info,
          });
        }
      },

      * fetchCurrent(_, {call, put}) {
        // const response = yield call(queryCurrent);
        const token = localStorage.getItem("pityToken")
        const userInfo = localStorage.getItem("pityUser")
        // if (!token || !userInfo) {
        if (token === null || token === '') {
          history.push("/user/login");
          // history.push("/user/login");
          // window.location.href = "/"
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
      save(state, {payload}) {
        return {...state, ...payload}
      },
      saveCurrentUser(state, action) {
        localStorage.setItem("pityUser", JSON.stringify(action.payload || {}))
        return {...state, currentUser: action.payload || {}};
      }
      ,

      changeNotifyCount(
        state = {
          currentUser: {},
        },
        action,
      ) {
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
