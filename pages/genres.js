import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

const defaultBaseUrl = process.env.NEXT_PUBLIC_MGNL_HOST;

export default function BasicGrid() {

    const [results, setResults] = useState([]);

    const fetchItems = async () => {
        const url = `${defaultBaseUrl}/.rest/delivery/genres/v1`;
        const response = await fetch(url);
        const json = await response.json();
        setResults(json.results);
    }

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <Box sx={{flexGrow: 1}}>
            {results && results.length > 0 ? (
                <Grid container spacing={2}>
                    {results.map((item, index) => {
                        return (
                            <Grid item xs={4} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" href={`/genres/${item.name}`}>
                                            See recommendations
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            ) : (
                "Nothing to display."
            )}
        </Box>
    );
}