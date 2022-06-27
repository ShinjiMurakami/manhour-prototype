import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import axios from 'axios';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
        // console.log(props);
        // this.state.value = 4;
        // this.state({value: this.props.postValue});
        // this.state = props.postValue;


        // this.state = {posts: ''};
        // this.setState({posts: props.searchResult});
    }

    funPost(value) {
        // console.log(value);

        const params = new URLSearchParams();
        params.append('search', value);
        axios.post('http://localhost:3001/api', params)
            .then(response => response.data)
            .then((result) => {this.setState({posts: result})})            
            .catch(function (error) {
                console.log("error", error);
            })
    }
    
// export default function List(props) {
//     const useStyles = makeStyles({
//         table: {
//             minWidth: 650,
//         },
//     });



    // エラー原因
    // const classes = useStyles({});


    render () {
    return (
        <>
        <TableContainer component={Paper}>
            <Table className={useStyles.table} aria-label="simple table">
                <TableHead>
                    <tableRow>
                        <Button color="inherit" onClick={() => this.funPost(this.props.postValue)}>検索</Button>
                    </tableRow>
                    <TableRow>
                        <TableCell>西暦／月</TableCell>
                        <TableCell align="left">社員名</TableCell>
                        <TableCell align="left">プロジェクト</TableCell>
                        <TableCell align="left">工程詳細</TableCell>
                        <TableCell align="right">時間／月</TableCell>
                        <TableCell align="left">工程</TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                {this.state.posts.map(post => 
                <TableRow>
                    <TableCell component="th" scope="row">
                    {post.yyyymm}
                    </TableCell>
                    <TableCell align="left">{post.user_name}</TableCell>
                    <TableCell align="left">{post.project_code}:{post.product_name}）{post.project_name}</TableCell>
                    <TableCell align="left">{post.process_detail}</TableCell>
                    <TableCell align="right">{post.hh}</TableCell>
                    <TableCell align="left">{post.process_name}</TableCell>
                </TableRow>
                )}
                </TableBody>                
            </Table>
        </TableContainer>
        </>
    );
}}