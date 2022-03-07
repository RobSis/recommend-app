import * as React from 'react';
import { Container, Typography } from '@mui/material';
import TopBar from '../components/TopBar';
import { EditableArea } from '@magnolia/react-editor';

export default function HomePage(props) {
  const { main, title } = props;
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
            { title }
          </Typography>

          <div className='Main'>
            {main && <EditableArea className='Area' content={main} />}
          </div>
        </Container>
      </main>
    </>
  );
}