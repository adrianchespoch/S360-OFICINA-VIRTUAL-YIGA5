import type { Components } from '@mui/material/styles';

import { Theme } from '../utils';

export const MuiStack = {
  defaultProps: { useFlexGap: true },
} satisfies Components<Theme>['MuiStack'];
