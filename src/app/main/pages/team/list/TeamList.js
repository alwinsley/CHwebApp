import React from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import TeamTable from './TeamTable';
import TeamHeader from './TeamHeader';
import reducer from '../store/reducers';

const Products = () => {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        toolbar: 'px-16 sm:px-24'
      }}
      header={<TeamHeader />}
      content={<TeamTable />}
      innerScroll
    />
  );
};

export default withReducer('eCommerceApp', reducer)(Products);
