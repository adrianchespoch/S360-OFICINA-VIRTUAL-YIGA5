/* eslint-disable indent */
import {
  california,
  kepple,
  neonBlue,
  nevada,
  redOrange,
  shakespeare,
  stormGrey,
} from './colors';
import { ColorMode } from './create-theme';

export function palette(mode: ColorMode): object {
  return {
    mode,

    ...(mode === 'light'
      ? {
          action: { disabledBackground: 'rgba(0, 0, 0, 0.06)' },
          background: {
            default: stormGrey[50],
            paper: stormGrey[50],
            level1: stormGrey[100],
            level2: stormGrey[200],
            level3: stormGrey[300],
          },
          common: { black: '#000000', white: '#ffffff' },
          divider: stormGrey[200],
          error: {
            ...redOrange,
            light: redOrange[400],
            main: redOrange[500],
            dark: redOrange[600],
            contrastText: '#ffffff',
          },
          info: {
            ...shakespeare,
            light: shakespeare[400],
            main: shakespeare[500],
            dark: shakespeare[600],
            contrastText: '#ffffff',
          },
          neutral: { ...stormGrey },
          primary: {
            ...neonBlue,
            light: neonBlue[400],
            main: neonBlue[500],
            dark: neonBlue[600],
            contrastText: '#ffffff',
          },
          secondary: {
            ...nevada,
            light: nevada[600],
            main: nevada[700],
            dark: nevada[800],
            contrastText: '#ffffff',
          },
          success: {
            ...kepple,
            light: kepple[400],
            main: kepple[500],
            dark: kepple[600],
            contrastText: '#ffffff',
          },
          text: {
            primary: stormGrey[900],
            secondary: stormGrey[500],
            disabled: stormGrey[400],
          },
          warning: {
            ...california,
            light: california[400],
            main: california[500],
            dark: california[600],
            contrastText: '#ffffff',
          },
        }
      : {
          action: { disabledBackground: 'rgba(0, 0, 0, 0.12)' },
          background: {
            default: stormGrey[950],
            paper: stormGrey[900],
            level1: stormGrey[800],
            level2: stormGrey[700],
            level3: stormGrey[600],
          },
          common: { black: '#000000', white: '#ffffff' },
          divider: stormGrey[700],
          error: {
            ...redOrange,
            light: redOrange[300],
            main: redOrange[400],
            dark: redOrange[500],
            contrastText: '#000000',
          },
          info: {
            ...shakespeare,
            light: shakespeare[300],
            main: shakespeare[400],
            dark: shakespeare[500],
            contrastText: '#000000',
          },
          neutral: { ...nevada },
          primary: {
            ...neonBlue,
            light: neonBlue[300],
            main: neonBlue[400],
            dark: neonBlue[500],
            contrastText: '#000000',
          },
          secondary: {
            ...nevada,
            light: nevada[100],
            main: nevada[200],
            dark: nevada[300],
            contrastText: '#000000',
          },
          success: {
            ...kepple,
            light: kepple[300],
            main: kepple[400],
            dark: kepple[500],
            contrastText: '#000000',
          },
          text: {
            primary: stormGrey[100],
            secondary: stormGrey[400],
            disabled: stormGrey[600],
          },
          warning: {
            ...california,
            light: california[300],
            main: california[400],
            dark: california[500],
            contrastText: '#000000',
          },
        }),
  };
}
