// import React from 'react';
// import { Redirect } from 'react-router-dom';
// import { FuseUtils } from '@fuse/index';
// import { pagesConfigs } from 'app/main/pages/pagesConfigs';
// import { public_pagesConfigs } from 'app/main/pages/public_pagesConfigs';



// const token = localStorage.getItem('token');
// console.log('token:', token);

// if(token != null && token != ""){
//   const routeConfigs = [...pagesConfigs];
//   const routes = [
//     ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
//     {
//       component: () => <Redirect to="/error-404" />
//     }
//   ];
// }else{
//   const public_routeConfigs = [...public_pagesConfigs];
//   const routes = [
//     ...FuseUtils.generateRoutesFromConfigs(public_routeConfigs),
//     {
//       component: () => <Redirect to="/error-404" />
//     }
//   ]
// }


// export default routes;
