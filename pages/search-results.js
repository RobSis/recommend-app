import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {setURLSearchParams} from "../utils";
import SearchTeaser from "../templates/components/search/SearchTeaser";
import {Typography} from "@mui/material";

const defaultBaseUrl = process.env.NEXT_PUBLIC_MGNL_HOST;

export default function BasicGrid() {

    const [results, setResults] = useState([]);

    const fetchItems = async (term) => {
        const url = setURLSearchParams(`${defaultBaseUrl}/.rest/delivery/recommendations/v1`, `q=${term}`)
        const response = await fetch(url);
        const json = await response.json();
        setResults(json.results);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const term = urlParams.get('q');

        fetchItems(term);
    }, []);

    return (
        <>
            <Typography
                component="h1"
                variant="h2"
                align="left"
                color="text.primary"
                gutterBottom
            >
                Search Results
            </Typography>
            <Box sx={{flexGrow: 1}}>
                {results && results.length > 0 ? (
                    <Grid container spacing={2}>
                        {results.map((item, index) => {
                            return (
                                <Grid item xs={12} key={index}>
                                    <SearchTeaser item={item}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                ) : (
                    "Nothing to display."
                )}
            </Box>
        </>
    );
}