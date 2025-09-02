import * as path from "path";

export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/index',
              },
              {
                path: '/index',
                name: '工作台',
                // icon: 'rocket',
                icon: 'icon-gongzuotai2',
                component: './Dashboard/Workspace',
              },
              {
                path: '/account/settings',
                name: '个人设置',
                component: './account/settings',
                // hideInMenu: true,
              },
              {
                path: '/member/:user_id',
                name: '用户资料',
                component: './UserInfo',
                // component: "./Building",
                hideInMenu: true,
              },
              {
                path: '/UiTest',
                name: 'UI测试',
                // icon: 'rocket',
                icon: 'icon-gongzuotai2',
                routes: [
                  {
                    path: '/UiTest/project',
                    name: '项目列表',
                    component: './Building'

                  },
                  {
                    path: '/UiTest/UITestcase',
                    name: 'UI用例编写',
                    component: './Building'

                  },
                  {
                    path: '/UiTest/testcasePage',
                    name: '页面管理',
                    component: './Building'

                  },
                  {
                    path: '/UiTest/testcasePath/:directory/add',
                    name: '页面元素',
                    component: './Building'

                  },
                  {
                    path: '/UiTest/testcaseP/:directory/add',
                    name: '关键字库',
                    component: './Building'

                  },
                  {
                    path: '/UiTest/PytestDeepSeek',
                    name: 'UI自动化工具——Browser Use + Pytest + DeepSeek！',
                    component: './Building'

                  },
                ]
              },

              {
                path: '/apiTest',
                name: '接口测试',
                icon: 'book',
                // icon: 'icon-ApiTest',
                routes: [
                  {
                    path: '/apiTest/project',
                    name: '项目列表',
                    component: './ApiTest/Project',
                  },
                  {
                    path: '/apiTest/project/:id',
                    hideInMenu: true,
                    component: './ApiTest/ProjectDetail',
                  },
                  {
                    path: '/apiTest/testcase',
                    name: '接口用例',
                    component: "./ApiTest/TestCaseDirectory"
                  },
                  {
                    path: '/apiTest/testcase/:directory/add',
                    name: '添加用例',
                    hideInMenu: true,
                    component: "./ApiTest/TestCaseComponent"
                  },
                  {
                    path: '/apiTest/testcase/:directory/:case_id',
                    name: '编辑用例',
                    hideInMenu: true,
                    component: "./ApiTest/TestCaseComponent"
                  },
                  {
                    path: '/apiTest/testplan',
                    name: '测试计划',
                    component: "./ApiTest/TestPlan"
                  },
                  {
                    path: '/apiTest/statistic',
                    name: '数据统计',
                  },
                ]
              },
              {
                path: '/record',
                icon: 'icon-jilu1',
                name: '测试报告',
                routes: [
                  {
                    path: '/record/list',
                    name: '构建历史',
                    component: './BuildHistory/ReportList',
                  },
                  {
                    path: '/record/report/:id',
                    hideInMenu: true,
                    component: './BuildHistory/ReportDetail',
                  },
                ],
              },

              {
                path: '/precise',
                icon: 'icon-jingzhun',
                name: '精准测试',
                component: "./Building"
              },
              {
                path: '/factory',
                icon: 'icon-hebingxingzhuang',
                name: '数据工厂',
                component: "./Building"
              },
              {
                path: '/notification',
                name: '消息中心',
                hideInMenu: true,
                component: './Notification'
              },
              {
                path: '/ci',
                icon: 'icon-CI',
                name: '持续集成',
                component: "./Building"
              },
              {
                path: '/config',
                // icon: 'rocket',
                icon: 'icon-config',
                name: '管理中心',
                authority: ['superAdmin', 'admin'],
                routes: [
                  {
                    path: '/config/system',
                    name: '系统设置',
                    component: './Config/SystemConfig',
                  },
                  {
                    path: '/config/environment',
                    name: '环境管理',
                    component: './Config/Environment',
                  },
                  {
                    path: '/config/gconfig',
                    name: '全局变量',
                    component: './Config/GConfig',
                  },
                  {
                    path: '/config/database',
                    name: '数据库配置',
                    component: './Config/Database',
                  },
                  {
                    path: '/config/redis',
                    name: 'Redis配置',
                    component: './Config/Redis',
                  },
                  {
                    path: '/config/user',
                    name: '用户管理',
                    // component: './Config/UserList',
                    component: './Manager/UserList',
                    authority: ['superAdmin'],
                  },
                  {
                    path: '/config/oss',
                    name: 'oss文件',
                    component: './Config/Oss',
                  },
                ],
              },
              {
                path: '/tool',
                name: '实用工具',
                icon: 'tool',
                routes: [
                  {
                    path: '/tool/request',
                    name: 'HTTP测试',
                    icon: 'icon-yunhang',
                    component: './Tool/Request',
                  },
                  {
                    path: '/tool/sql',
                    name: 'SQL客户端',
                    icon: 'database',
                    component: './Tool/SqlOnline',
                  },
                  {
                    path: '/tool/redis',
                    name: 'Redis客户端',
                    icon: 'redis',
                    component: './Tool/RedisOnline',
                  },
                ],
              },
              {
                path: '/TreasureBox',
                name: '百宝箱Tool',
                // icon: 'rocket',
                icon: 'icon-gongzuotai2',
                component: './Tool/TreasureBox',
              },
              {
                path: '/testReact',
                name: '学习测试react工作台',
                // icon: 'rocket',
                icon: 'icon-gongzuotai2',
                component: './TestReact/testRequest',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
