import { createTheme, Theme } from '@mui/material/styles';
import createPalette, { PaletteOptions } from '@mui/material/styles/createPalette';
import { frFR } from '@mui/material/locale';

export const palette = createPalette({} as PaletteOptions);
  
export const muiTheme = createTheme(
  {
    palette,
    components: {},
  } as Theme,
  frFR, // locale FR pour Mui
);