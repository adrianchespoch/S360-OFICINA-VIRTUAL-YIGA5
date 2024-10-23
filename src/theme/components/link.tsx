import type { Components } from '@mui/material/styles';

import { Theme } from '../utils';

export const MuiLink = {
  defaultProps: { underline: 'hover' },
} satisfies Components<Theme>['MuiLink'];
