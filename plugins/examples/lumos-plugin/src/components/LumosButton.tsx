import { Icon } from '@iconify/react';
import { Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { LumosDrawer } from './LumosDrawer';

export function LumosButton() {
  const currentDisplay = localStorage.getItem('displayLumosDrawer');

  const [displayDrawer, setDisplayDrawer] = useState<boolean>(currentDisplay === 'true');

  const theme = useTheme();

  console.log('loading displayDrawer', displayDrawer);

  useEffect(() => {
    const currentLocalDisplay = localStorage.getItem('displayLumosDrawer');
    console.log(`currentLocalDisplay: ${currentLocalDisplay}`);

    const displayLumosDrawer = localStorage.getItem('displayLumosDrawer') === 'true';
    console.log('now setting new displayLumosDrawer', displayLumosDrawer);
    setDisplayDrawer(displayLumosDrawer);
  }, [displayDrawer]);

  function handleDisplayToggle() {
    console.log(`switching from ${displayDrawer} to ${!displayDrawer}`);
    const newDisplay = !displayDrawer;
    localStorage.setItem('displayLumosDrawer', newDisplay.toString());
    console.log(`new display: ${newDisplay}`);
    setDisplayDrawer(newDisplay);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <IconButton
        variant="contained"
        onClick={handleDisplayToggle}
        size="small"
        sx={{
          margin: '0 0.5rem',
          backgroundColor: '#000',
          borderRadius: '5em',
          textTransform: 'none',
          '&:hover': {
            background: '#605e5c',
          },
        }}
      >
        <Icon
          icon="mdi:lightbulb-variant"
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: displayDrawer ? 'gold' : 'd3d3d3',
          }}
        />
      </IconButton>

      {!!displayDrawer && (
        <Box
          sx={{
            position: 'fixed',
            top: '60%',
            left: '80%',
            width: '40vw',
            height: '80vh',
            transform: 'translate(-50%, -50%)',
            backgroundColor: theme.palette.mode === 'dark' ? '#616060' : '#d3d3d3',
            color: theme.palette.text.primary,
            zIndex: 7,
            borderRadius: '2em',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.77)',
          }}
        >
          <LumosDrawer toggleDisplayDrawer={handleDisplayToggle} />
        </Box>
      )}
    </Box>
  );
}
