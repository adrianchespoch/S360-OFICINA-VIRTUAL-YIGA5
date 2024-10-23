import { Box, Collapse, List, ListItemButton, SvgIcon } from '@mui/material';
import { Theme, alpha } from '@mui/material/styles';
import { useState } from 'react';
import { IoChevronForward, IoChevronUp } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

import { CustomMenuItem } from '.';
import { NestedMenuItem } from '../utils';

export type SideNavMultiLevelProps = {
  item: NestedMenuItem;
};

const SideNavMultiLevel: React.FC<SideNavMultiLevelProps> = ({ item }) => {
  const { pathname } = useLocation();
  const active = item.path === pathname;

  const { items: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          //
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body1',
          color: 'text.disabled',
          fontWeight: 'fontWeightMedium',

          ...(active && {
            color: 'primary.contrastText',
            fontWeight: 'fontWeightMedium',
            bgcolor: (theme: Theme) => theme.palette.primary.main,
            '&:hover': {
              bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.9),
              color: 'primary.contrastText',
            },
          }),
        }}
      >
        {/* --- icon + title --- */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="span"
            sx={{ width: 24, height: 24, mr: 2, fontSize: '.99rem' }}
          >
            {item.icon}
          </Box>
          <Box component="span">{item.title} </Box>
        </Box>

        {/* --- open icon --- */}
        {open ? (
          <SvgIcon fontSize="small">
            <IoChevronUp />
          </SvgIcon>
        ) : (
          <SvgIcon fontSize="small" sx={{ color: 'neutral.500' }}>
            <IoChevronForward />
          </SvgIcon>
        )}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children?.map((child: any, key: any) => (
            <CustomMenuItem key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default SideNavMultiLevel;
