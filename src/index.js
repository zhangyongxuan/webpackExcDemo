/*
 * @Description: 
 * @Date: 2020-03-31 10:36:36
 * @author: zhangyongxuan <yongxuan.zhang@hand-china.com>
 * @version: 1.0.0
 * @copyright: Copyright (c) 2019, Hand
 */
import dva from 'dva';
import { createBrowserHistory } from 'history';
import routes from './router';



const app = dva({
  history: createBrowserHistory({
    basename:'/app'
  })
});
app.router(routes);
app.start('#root');