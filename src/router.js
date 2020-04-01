/*
 * @Description: 
 * @Date: 2020-03-31 15:56:53
 * @author: zhangyongxuan <yongxuan.zhang@hand-china.com>
 * @version: 1.0.0
 * @copyright: Copyright (c) 2019, Hand
 */

import React from 'react';
import { routerRedux, Switch, Route,Redirect } from 'dva/router';
import routes from '../config/routes';


const { ConnectedRouter } = routerRedux;

function getRoutes(routes) {
    if (routes.components) {
        getRoutes(routes.components);
    } else {
        return routes.map(item => {
            return <Route path={item.path} key={item.path} component={require(`./routes/${item.component}`).default} />;
        })
    }
}


export default function ({ history }) {
    return (<ConnectedRouter history={history}>
        <Switch>
            {
                getRoutes(routes)
            }
            <Redirect form='/' to='home' />
        </Switch>
    </ConnectedRouter>)
}