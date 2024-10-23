import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { MouseEvent, useState } from 'react';

import { useAuthStore } from '@/store/auth';

const AccountPopover = () => {
  const [open, setOpen] = useState<null | HTMLElement>(null);

  ///* global state
  const logOut = useAuthStore(s => s.onLogout);
  const user = useAuthStore(s => s.user);
  const userProfile = useAuthStore(s => s.userProfile);

  ///* handlers
  const handleLogout = async () => {
    logOut();
  };

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: theme => alpha(theme?.palette?.grey[500], 0.08),
          ...(open && {
            background: theme =>
              `linear-gradient(135deg, ${theme?.palette?.primary.light} 0%, ${theme?.palette?.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={''}
          alt={user?.username}
          sx={{
            width: 36,
            height: 36,
            border: theme => `solid 2px ${theme?.palette?.background.default}`,
          }}
        >
          {user?.username?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          {/* saludo */}
          <Typography variant="subtitle1" noWrap textAlign="center" pb={1}>
            Bienvenido
          </Typography>

          <Typography variant="subtitle2" noWrap>
            {user?.username || 'Sin usuario'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email || 'Sin correo'}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }} noWrap>
            {userProfile?.empresa_name || 'Sin empresa'}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* {MENU_OPTIONS.map(option => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))} */}

        {/* <Divider sx={{ borderStyle: 'dashed', m: 0 }} /> */}

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Cerrar Sesión
        </MenuItem>
      </Popover>
    </>
  );
};
export default AccountPopover;
