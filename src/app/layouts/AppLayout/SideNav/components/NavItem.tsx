import { Box, ListItemButton } from '@mui/material';
import { Theme, alpha } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

import { CustomRouterLink } from '.';

interface NavItemProps {
  item: {
    path: string;
    title: string;
    icon: React.ReactElement;
  };
}

const NavItem: React.FC<NavItemProps> = ({ item }) => {
  const { pathname } = useLocation();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={CustomRouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
};

export default NavItem;
