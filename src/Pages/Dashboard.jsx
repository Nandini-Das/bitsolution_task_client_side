import React from 'react';
import SideNavigation from './Shared/SideNavigation';
import { Typography } from '@mui/material';

const Dashboard = () => {
    return (
        <div>
            <SideNavigation />
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
                <img src="https://images.unsplash.com/photo-1539956071741-0c1918d19bde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
        </div>
    );
};

export default Dashboard;
