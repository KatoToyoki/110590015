import React  from "react";
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

{/* <ProSidebarProvider>
  <App />
</ProSidebarProvider>;  */}

function Layout() {
    const { collapseSidebar } = useProSidebar();
  
    return (
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar>
          <Menu>
            <MenuItem> Documentation</MenuItem>
            <MenuItem> Calendar</MenuItem>
            <MenuItem> E-commerce</MenuItem>
          </Menu>
        </Sidebar>
        <main>
          <button onClick={() => collapseSidebar()}>Collapse</button>
        </main>
      </div>
    );
}

export default Layout;