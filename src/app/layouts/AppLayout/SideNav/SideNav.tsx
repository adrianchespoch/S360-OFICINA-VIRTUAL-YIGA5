import { InputAdornment, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { Theme, alpha } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { ROUTER_PATHS } from '@/router/constants';
import { Scrollbar } from '@/shared/components/common';
import { useIsMediaQuery } from '@/shared/hooks';
import { useUiStore } from '@/store/ui';
import { NAV } from '../common';
import { CustomMenuItem } from './components';
import { useNestedMenuItems } from './utils';

type MenuItem = {
  title: string;
  items?: MenuItem[];
};

export default function SideNav() {
  const { nestedMenu } = useNestedMenuItems();

  const [searchModule, setSearchModule] = useState<string>('');
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>(nestedMenu);

  const searchByTitle = useCallback(
    (arr: MenuItem[], titulo: string): MenuItem[] => {
      const resultados: MenuItem[] = [];

      for (const item of arr) {
        let foundInChild = false;
        const newItem: any = { ...item, items: [] };

        if (item.items && item.items.length > 0) {
          const encontrados = searchByTitle(item.items, titulo);
          if (encontrados.length > 0) {
            newItem.items = encontrados;
            foundInChild = true;
          }
        }

        if (
          item.title.toLowerCase().includes(titulo.toLowerCase()) ||
          foundInChild
        ) {
          resultados.push(newItem);
        }
      }

      return resultados;
    },
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchModule(value);

      const resultados = searchByTitle(nestedMenu, value);
      if (value) {
        setFilteredMenu(resultados);
      } else {
        setFilteredMenu(nestedMenu);
      }
    },
    [nestedMenu, searchByTitle]
  );

  // render LOGO ------
  const renderLogo = (
    <Box
      component={Link}
      to={ROUTER_PATHS.home}
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        mb: 5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme: Theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      {/* <Box component="img" src="/ultralink-logo.png" alt="Ultralink Logo"></Box> */}
      LOGO
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {filteredMenu
        .map((item, key) => {
          if (!item) return null;
          return <CustomMenuItem key={key} item={item} />;
        })
        .filter(Boolean)}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {renderLogo}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pb: 2,
          px: 2.5,
        }}
      >
        <TextField
          value={searchModule}
          placeholder="Buscar"
          onChange={handleChange}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch color="action" />
              </InputAdornment>
            ),
            style: { color: 'white' },
            inputProps: {
              'aria-label': 'Buscar',
              style: { color: 'white' },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'gray',
                borderWidth: '.1px',
              },
            },
          }}
        />
      </Box>
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  const isMd = useIsMediaQuery('md');
  const openNav = useUiStore(s => s.isNavOpen);
  const onClose = () => useUiStore.setState({ isNavOpen: false });
  const openNavMobile = useUiStore(s => s.isNavOpenMobile);
  const onCloseMobile = () => useUiStore.setState({ isNavOpenMobile: false });

  const isDark = useUiStore(s => s.colorMode) === 'dark';

  return (
    <>
      {!isMd ? (
        <Drawer
          sx={{
            width: NAV.WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: NAV.WIDTH, boxSizing: 'border-box' },
          }}
          PaperProps={{
            sx: {
              bgcolor: !isDark ? '#121621' : '#1f2937',
              color: 'common.white',
            },
          }}
          anchor="left"
          variant="persistent"
          open={openNav}
          onClose={onClose}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          sx={{
            width: NAV.WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: NAV.WIDTH,
              boxSizing: 'border-box',
            },
          }}
          PaperProps={{
            sx: {
              bgcolor: !isDark ? '#121621' : '#1f2937',
              color: 'common.white',
            },
          }}
          anchor="left"
          variant="temporary"
          open={openNavMobile}
          onClose={onCloseMobile}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}
