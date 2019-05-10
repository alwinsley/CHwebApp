import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse/index';
import { pagesConfigs } from 'app/main/pages/pagesConfigs';
import { public_pagesConfigs } from 'app/main/pages/public_pagesConfigs';


var routeConfigs = [...pagesConfigs];


const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    component: () => <Redirect to="/error-404" />
  }
];

export default routes;
