// SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
//
// SPDX-License-Identifier: MIT

import * as React from 'react';
import ColorModeContext from '../context/ColorModeContext';
import { Box, FormControlLabel, styled, Switch } from '@mui/material';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        // Moon with small arc
        //backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        // Moon with bigger arc
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M 4.2 2.5 l -0.7 1.8 l -1.8 0.7 l 1.8 0.7 l 0.7 1.8 l 0.6 -1.8 L 6.7 5 l -1.9 -0.7 l -0.6 -1.8 z m 15 8.3 a 6.7 6.7 0 1 1 -6.6 -6.6 a 3.8 3.8 0 0 0 6.6 6.6 z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    //backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#b1d6fa',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      // Sun with body "outlined"
      //backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z" /></svg>')`,
      // Sun with body "filled"
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M 9.305 1.667 V 3.75 h 1.389 V 1.667 h -1.39 z m -4.707 1.95 l -0.982 0.982 L 5.09 6.072 l 0.982 -0.982 l -1.473 -1.473 z m 10.802 0 L 13.927 5.09 l 0.982 0.982 l 1.473 -1.473 l -0.982 -0.982 z M 10 5.139 a 4.872 4.872 0 0 0 -4.862 4.86 A 4.872 4.872 0 0 0 10 14.862 A 4.872 4.872 0 0 0 14.86 10 A 4.872 4.872 0 0 0 10 5.139 z z M 1.665 9.305 v 1.39 h 2.083 v -1.39 H 1.666 z m 14.583 0 v 1.39 h 2.084 v -1.39 h -2.084 z M 5.09 13.928 L 3.616 15.4 l 0.982 0.982 l 1.473 -1.473 l -0.982 -0.982 z m 9.82 0 l -0.982 0.982 l 1.473 1.473 l 0.982 -0.982 l -1.473 -1.473 z M 9.305 16.25 v 2.083 h 1.389 V 16.25 h -1.39 z" /></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function ColorModeToggleButton() {
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        //p: 3,
      }}
    >
      <FormControlLabel
        control={<MaterialUISwitch onClick={colorMode.toggleColorMode} sx={{ /*m: 1*/ }} defaultChecked />}
        //label="MUI switch"
        label=""
        labelPlacement='top'
      />
    </Box>
  );
}