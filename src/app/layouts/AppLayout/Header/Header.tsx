import { Grid } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

import { useIsMediaQuery } from '@/shared/hooks';
import { useUiStore } from '@/store/ui';
import {
  AccountPopover,
  Searchbar,
  ToggleColorMode,
  ToggleSidebarBtn,
} from '.';
import { NAV } from '../common';

interface HeaderProps {}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  backdropFilter: 'blur(6px)',
  position: 'sticky',
  boxShadow: 'none', // prevent default elevation
  backgroundColor: 'var(--mui-palette-background-default)',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${NAV.WIDTH}px)`,
    marginLeft: `${NAV.WIDTH}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header: React.FC<HeaderProps> = () => {
  const isOpen = useUiStore(s => s.isNavOpen);
  const isMd = useIsMediaQuery('md');

  const renderContent = (
    <>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="flex-start"
      >
        <Grid item>
          <ToggleSidebarBtn />
        </Grid>

        <Grid item>
          <ToggleColorMode />
        </Grid>
      </Grid>
      <span className="spacer" />

      <Searchbar />

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar position="fixed" open={!isMd && isOpen}>
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
