import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { useIsMediaQuery } from '@/shared/hooks';
import { useUiStore } from '@/store/ui';
import { Header } from './Header';
import { SideNav } from './SideNav';
import { MainContent, NAV } from './common';

export interface AppLayoutInterface {}

const LayoutRoot = styled('div')<{
  open?: boolean;
}>(({ theme, open }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: NAV.WIDTH,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppLayout: React.FC<AppLayoutInterface> = () => {
  const isNavOpen = useUiStore(s => s.isNavOpen);
  const isMd = useIsMediaQuery('md');

  return (
    <div>
      <Header />

      <SideNav />

      <LayoutRoot open={!isMd && isNavOpen}>
        <MainContent>
          <Outlet />
        </MainContent>
      </LayoutRoot>
    </div>
  );
};

export default AppLayout;
