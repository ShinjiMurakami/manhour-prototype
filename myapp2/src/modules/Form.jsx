import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
// import Button from '@material-ui/core/Button'
// import axios from 'axios';

export default function Form(props) {
    const [search, setSearch] = useState('');

    const funSetSearch = (e) => {
        setSearch(() => e.target.value);
        props.setValue(e.target.value);
    }

    return (
        <>
            <br></br>
            <Grid container rowSpacing={0} >
                <form>
                    <Grid item xs={8}>
                        <TextField
                            label="検索値"
                            value={search}
                            onChange={funSetSearch}
                        />
                    </Grid>
                    {/* <Grid item> */}

                        {/* <Button color="inherit" onClick={funPost}>検索</Button> */}
                    {/* </Grid> */}

                    
                </form>
            </Grid>
        </>
    )
}








