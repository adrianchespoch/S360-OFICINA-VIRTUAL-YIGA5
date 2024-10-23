/* eslint-disable indent */
import { Box, ListItemButton } from '@mui/material';
import { Theme, alpha } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

import { useIsMediaQuery } from '@/shared/hooks';
import { useUiStore } from '@/store/ui';
import { NestedMenuItem, NestedMenuItemLevels } from '../utils';

export type SideNavSingleLevelProps = {
  item: NestedMenuItem;
};

const SideNavSingleLevel: React.FC<SideNavSingleLevelProps> = ({ item }) => {
  const { pathname } = useLocation();
  const setIsNavOpenMobile = useUiStore(s => s.setIsNavOpenMobile);
  const isMd = useIsMediaQuery('md');

  const active = item.path === pathname;

  const onClick = () => {
    isMd && setIsNavOpenMobile(false);
  };

  return (
    <>
      {item &&
      item.level &&
      item.level !== NestedMenuItemLevels.withChildren ? (
        <ListItemButton
          sx={{
            minHeight: 44,
            borderRadius: 0.75,
            typography: 'body1',
            color: 'text.disabled',
            fontWeight: 'fontWeightMedium',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              bgcolor: 'neutral.900',
              color: 'primary.contrastText',
            },

            ...(active && {
              color: 'primary.contrastText',
              fontWeight: 'fontWeightMedium',
              bgcolor: (theme: Theme) => theme.palette.primary.main,
              '&:hover': {
                bgcolor: (theme: Theme) =>
                  alpha(theme.palette.primary.main, 0.9),
                color: 'primary.contrastText',
              },
            }),
          }}
          onClick={onClick}
        >
          <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
            {item.icon}
          </Box>

          <Box
            component="span"
            sx={{
              pl:
                item.level >= 3 &&
                item.level < NestedMenuItemLevels.firsLevelAlone
                  ? '.9rem'
                  : 0,
            }}
          >
            {item.title}{' '}
          </Box>
        </ListItemButton>
      ) : null}
    </>
  );
};

export default SideNavSingleLevel;
