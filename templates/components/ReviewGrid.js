import * as React from 'react';
import { Grid } from '@mui/material';
import Teaser from '../components/Teaser';

export default function ReviewGrid(props) {
  const {recommendations} = props;
  return (
    <Grid container spacing={4}>
      {recommendations && recommendations.map((recommendation) => (
        <Grid item key={recommendation} xs={12} sm={6} md={4}>
          <Teaser />
        </Grid>
      ))}
    </Grid>
  );
}
