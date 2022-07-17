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

    // const funPost = () => {
    //     const params = new URLSearchParams();
    //     params.append('search', search);
    //     axios.post('http://localhost:3001/api', params)
    //         .then(function(res) {
    //             // console.log(res.data);
    //             props.setDisplay(res.data);
    //             // for ( var i in res.data.message ) {
    //             //     props.setDisplay({
    //             //         ...props.display,
    //             //         id: res.data.message[i].id,
    //             //         yyyymm: res.data.message[i].yyyymm,
    //             //         user_name: res.data.message[i].user_name,
    //             //         project_code: res.data.message[i].project_code,
    //             //         product_name: res.data.message[i].product_name,
    //             //         project_name: res.data.message[i].project_name,
    //             //         process_name: res.data.message[i].process_name,
    //             //         hh: res.data.message[i].hh,
    //             //         process_detail: res.data.message[i].process_detail
    //             //     });
    //             // }
    //             props.setFlag(true);
    //         })
    //         .catch(function (error) {
    //             console.log("error", error);
    //         })
    // }

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








