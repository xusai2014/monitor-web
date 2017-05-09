import React from 'react';
import {PageHeader} from './Header';

const Layout = props => (
    <div>
        <PageHeader />
        {props.children}
    </div>
);

export default Layout;
