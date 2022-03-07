import * as React from 'react';
import { Grid } from '@mui/material';
import Teaser from '../components/Teaser';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function ReviewGrid() {
  return (
    <Grid container spacing={4}>
      {cards.map((card) => (
        <Grid item key={card} xs={12} sm={6} md={4}>
          <Teaser />
        </Grid>
      ))}
    </Grid>
  );
}
