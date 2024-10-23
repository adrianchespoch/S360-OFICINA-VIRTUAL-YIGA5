import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { useMemo } from 'react';

import { useUiStore } from '@/store/ui';
import { createAppTheme } from './utils';

export type AppThemeProps = {
  children: React.ReactNode;
};

const AppTheme: React.FC<AppThemeProps> = ({ children }) => {
  const mode = useUiStore(s => s.colorMode);
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
