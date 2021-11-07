import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

export default function Revenue({currentRevenue, setCurrentRevenue}) {
  return (
    <React.Fragment>
      <Title>Revenue</Title>

      $ 4.00

      <Typography component="p" variant="h4">
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
       Current Revenue
      </Typography>
      <div>
        
      </div>
    </React.Fragment>
  );
}
