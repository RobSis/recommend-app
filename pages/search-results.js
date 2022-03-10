import * as React from 'react';
import { useEffect, useState } from 'react';
import { setURLSearchParams } from "../utils";
import { Typography } from "@mui/material";
import ReviewGrid from '../templates/components/ReviewGrid';

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
            <ReviewGrid recommendations={results} />
        </>
    );
}