import React  from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

function Layout() {
    const { collapseSidebar } = useProSidebar();
  
    return (
        
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar>
          <Menu>
            <MenuItem>Home</MenuItem>
            <MenuItem> Search</MenuItem>
          </Menu>
        </Sidebar>
      </div>
      
    );
}



export default Layout;