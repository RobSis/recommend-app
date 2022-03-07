import * as React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import TopBar from '../components/TopBar';
import Teaser from '../components/Teaser';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function HomePage() {
  return (
    <>
      <TopBar />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="left"
            color="text.primary"
            gutterBottom
          >
            Latest Reviews
          </Typography>
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Teaser />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}