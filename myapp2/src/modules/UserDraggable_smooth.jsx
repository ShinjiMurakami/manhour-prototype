import React, { useState }from "react";
import axios from 'axios';
import {
  Grid,
  Link,
  Table,
  TableBody,
  TableContainer, 
  TableHead,
  TableRow,
  // TableCell,
  styled,
  Button
} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import styled from '@mui/material/styles';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";

const useStyles = styled((theme)=>({
  hoverCursor:{
    '&:hover':{
      cursor:"pointer"
    }
  },
}))


export const UserDraggable  = (props) => {
  const classes = useStyles();
  const [data, setData] = useState('');
  const value = props.postValue;

  const headCells = [
    { id: 'action', numeric: false, disablePadding: false, label: 'action', width: '10%', sortable: false},
    { id: 'index', numeric: false, disablePadding: false, label: 'Sort', width: '5%', sortable: false},
    { id: 'id', numeric: false, disablePadding: false, label: 'No', width: '5%', sortable: false},
    { id: 'yyyymm', numeric: false, disablePadding: false, label: '西暦／月', width: '10%', sortable: false},
    { id: 'user_name', numeric: false, disablePadding: false, label: '社員名', width: '10%', sortable: false},
    { id: 'project_code', numeric: false, disablePadding: false, label: 'プロジェクト', width: '30%', sortable: false},
    { id: 'process_detail', numeric: false, disablePadding: false, label: '工程詳細', width: '10%', sortable: false},
    { id: 'project_code', numeric: false, disablePadding: false, label: '時間／月', width: '10%', sortable: false},
    { id: 'process_name', numeric: false, disablePadding: false, label: '工程', width: '15%', sortable: false},
]

  console.log(data);

  const [ users, setUser ] = useState([]);
  
  // const [ users, setUser ] = useState([
  //   {id:1, name: "ユーザー1"},
  //   {id:2, name: "ユーザー2"},
  //   {id:3, name: "ユーザー3"},
  //   {id:4, name: "ユーザー4"}
  // ])

  const funPost = () => {
    const params = new URLSearchParams();
    params.append('search', value);
    axios.post('http://localhost:3001/api', params)
        .then(response => response.data)
        .then((result) => {
          setData(result);
          setUser(result);
        })
        .catch(function (error) {
            console.log("error", error);
        })
  }

  const deleteUser = (deletingUser) =>{
    const newUsers = users.filter((user)=>{
      return user.id !== deletingUser.id
    })
    setUser(newUsers);
  }

  const onDrop = (dropResult) => {
    // console.log(dropResult);
    
    const { removedIndex, addedIndex } = dropResult;
    // arrayMoveを使うと配列の操作は楽
    // const newArray = [...users];
    const newUsers = arrayMoveImmutable(users, removedIndex || 0, addedIndex || 0)
    // console.log(newUsers);
    setUser(newUsers);
  };


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      border: 0,
    },
    table: {
      minWidth: 650,
    },
  }));


  return(
    <React.Fragment>
    <Grid item xs={6}>
      <TableContainer>
        <Table aria-labelledby="tableTitle" size="small" className="tablePaginate" >
          <TableHead>
              <tableRow>
                <Button color="inherit" onClick={funPost}>検索</Button>
              </tableRow>
              <TableRow>
                <TableCell colSpan={9}><b>【react-smooth-dnd】</b> （テーブル崩れをどんなに頑張っても直せない…そもそもMaterial のテーブルとの相性が悪い？）</TableCell>
              </TableRow>
              <TableRow>
                {
                  headCells.map((headCell)=>{
                    return(<TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      style={{width: headCell.width}}>
                      {headCell.label}
                    </TableCell>)
                  })
                }
              </TableRow>
            </TableHead>
              <Container
                dragHandleSelector=".dragHandleSelector"//ここでドラッグ要素の指定
                lockAxis="y"
                onDrop={onDrop}
                
                //ここのrenderを使うのがポイント
                render={(ref)=>{
                  return (
                  <TableBody ref={ref}>
                    {
                      users.map((user, index) => {
                        return (
                          <Draggable
                            key={index}
                            render={(ref)=>{
                            return(
                              <TableRow
                                ref={ref}
                              >
                                <StyledTableCell>
                                  <DragHandleIcon className={ `dragHandleSelector ${classes.hoverCursor}` }/>
                                  <br/>
                                  <Link className={classes.hoverCursor} onClick={()=>{deleteUser(user)}}>
                                    行削除
                                  </Link>
                                </StyledTableCell>

                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell>{user.id}</StyledTableCell>
                                <StyledTableCell>{user.yyyymm}</StyledTableCell>
                                <StyledTableCell align="left">{user.user_name}</StyledTableCell>
                                <StyledTableCell align="left">{user.project_code}:{user.product_name}）{user.project_name}</StyledTableCell>
                                <StyledTableCell align="left">{user.process_detail}</StyledTableCell>
                                <StyledTableCell>{user.hh}</StyledTableCell>
                                <StyledTableCell>{user.process_name}</StyledTableCell>
                              </TableRow>
                            )
                          }} />
                        )
                      })
                    }
                  </TableBody>)
                }}
              />
          </Table>
        </TableContainer>
      </Grid>
    </React.Fragment>
  )
}

export default UserDraggable;