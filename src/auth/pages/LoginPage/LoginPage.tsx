import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdUnlock } from 'react-icons/io';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { useLogin } from '@/actions/auth';
import { loginFormSchema } from '@/shared/utils';
import { useAuthNoLSStore } from '@/store/auth';
import watchapp from '../../../assets/svg/watch_application.svg'
type LoginFormData = {
  username: string;
  password: string;
  // empresa: string;
};

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isBlocked = useAuthNoLSStore(s => s.isBlocked);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  ///* mutations
  const loginMutation = useLogin();

  ///* form
  const usernameForm = useForm<LoginFormData>({
    resolver: yupResolver(loginFormSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { isValid: isValidLoginData },
  } = usernameForm;

  ///* handlers
  const onSubmit = (data: LoginFormData) => {
    if (!isValidLoginData || isBlocked) return;
    console.log('data', data);

    loginMutation.mutate({...data, force_login: true});
    
  };

  // useLoaders(isLoadingEmpresas || loginMutation.isPending);

  return (
    <>
      <Box
        sx={{
          //width:'100%',
          //height: '100vh',
          width: { xs: '100%', md: '50%' },
          height: { xs: '300px', md: 'auto' },
          backgroundImage: `url("${watchapp}")`,
          backgroundSize: 'cover',
          objectFit: 'cover',
          backgroundPosition: 'center',
          //backgroundColor: '#F5F5F5'
        }}
      />
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          //backgroundColor: '#1f2937',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: { xs: '100%', sm: '80%', md: '75%' },
            p: { xs: 3, sm: 4 },
          }}
        >
          <Typography component="h1" variant="h2">
            <strong>Bienvenido de nuevo</strong>
          </Typography>
          <Typography
            component="h2"
            variant="h3"
            sx={{ color: '#9ca3af', mb: 2 }}
          >
            entra y empieza a disfrutar
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1, width: '100%' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Documento de Cédula o RUC"
              autoComplete="username"
              autoFocus
              {...register('username')}
              error={!!usernameForm.formState.errors.username}
              helperText={usernameForm.formState.errors.username?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              {...register('password')}
              error={!!usernameForm.formState.errors.password}
              helperText={usernameForm.formState.errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* <CustomTextField
              label="Nombre de usuario"
              // errors
              name="username"
              control={usernameForm.control}
              overrideAsPassword
              defaultValue={usernameForm.getValues().username}
              error={usernameForm.formState.errors.username}
              helperText={usernameForm.formState.errors.username?.message}
              InputProps={{
                style: { color: 'white' },
              }}
              required={false}
            />
            <CustomPasswordTextField
              label="Password"
              control={usernameForm.control}
              name="password"
              errors={usernameForm.formState.errors}
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={loginMutation.isPending || isBlocked}
              style={{
                backgroundColor: isBlocked ? '#374151' : '#2563eb',
                color: 'white',
              }}
            >
              Inicia sesión
            </Button>
          </Box>

          <Box mt={5}>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ color: '#9ca3af' }}
            >
              ©{new Date().getFullYear()} Yiga5
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
