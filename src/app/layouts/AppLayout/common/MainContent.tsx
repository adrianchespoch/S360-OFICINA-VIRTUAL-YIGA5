import Box from '@mui/material/Box';
import { ReactNode } from 'react';

import { useIsMediaQuery } from '@/shared/hooks';
import { useResponsive } from '@/shared/hooks/ui';
import { SxPropsThemeType } from '@/shared/interfaces';
import { HEADER } from './layout.constants';

const SPACING = 8;

interface MainContentProps {
  children: ReactNode;
  sx?: SxPropsThemeType;
  [key: string]: any;
}

export default function MainContent({
  children,
  sx,
  ...other
}: MainContentProps) {
  const lgUp = useResponsive('up', 'lg');
  const isMobile = useIsMediaQuery('sm');

  return (
    <Box
      component="main"
      // className="grainy"

      sx={{
        backgroundColor: 'background.default',
        padding: isMobile ? '18px' : '24px',

        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
