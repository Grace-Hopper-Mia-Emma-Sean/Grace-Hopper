import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Revenue() {
  return (
    <React.Fragment>
      <Title>Revenue</Title>
      <Typography component="p" variant="h4">
       Testing $$
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
       Current Revenue
      </Typography>
      <div>
        
      </div>
    </React.Fragment>
  );
}
