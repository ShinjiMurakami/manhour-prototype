import React, { useState }from "react";
import axios from 'axios';
import {
  Table,
  TableBody,
  TableContainer, 
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Button
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragHandleIcon from '@mui/icons-material/DragHandle';

export const UserDraggable  = (props) => {
  const value = props.postValue;

  const headCells = [
    { id: 'index', numeric: false, disablePadding: false, label: 'Sort', width: '5%', sortable: false},
    { id: 'id', numeric: false, disablePadding: false, label: 'No', width: '5%', sortable: false},
    { id: 'yyyymm', numeric: false, disablePadding: false, label: '西暦／月', width: '10%', sortable: false},
    { id: 'user_name', numeric: false, disablePadding: false, label: '社員名', width: '10%', sortable: false},
    { id: 'project_code', numeric: false, disablePadding: false, label: 'プロジェクト', width: '30%', sortable: false},
    { id: 'process_detail', numeric: false, disablePadding: false, label: '工程詳細', width: '10%', sortable: false},
    { id: 'project_code', numeric: false, disablePadding: false, label: '時間／月', width: '10%', sortable: false},
    { id: 'process_name', numeric: false, disablePadding: false, label: '工程', width: '15%', sortable: false},
]

const [ users, setUsers ] = useState([]);
const baseURL = process.env.REACT_APP_BASEURL;

const funPost = () => {
  const params = new URLSearchParams();
  params.append('search', value);
  axios.post(`${baseURL}/api`, params)
      .then(response => response.data)
      .then((result) => {
        setUsers(result);
      })
      .catch(function (error) {
          console.log("error", error);
      })
}

// ドラッグ&ドロップした要素を入れ替える
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// ドラッグ&ドロップの質問のスタイル
const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "#757ce8" : "white",
  ...draggableStyle
});
// ドラッグ&ドロップのリストのスタイル
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#1769aa" : "lightgrey",
  padding: "10px"
});

const onDragEnd = (result) => {
  // ドロップ先がない
  if (!result.destination) {
    return;
  }
  // 配列の順序を入れ替える
  let movedItems = reorder(
    users, //　順序を入れ変えたい配列
    result.source.index, // 元の配列の位置
    result.destination.index // 移動先の配列の位置
  );
  setUsers(movedItems);
};


return (
  <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <Button color="inherit" onClick={funPost}>検索</Button>
          </TableRow>
          <TableRow>
            <TableCell colSpan={8}>Material のテーブルと<b>【react-beautiful-dnd】</b> 相性よさそうな感じ</TableCell>
          </TableRow>
          <TableRow>
            {
              headCells.map((headCell)=>{
                return(<TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  // padding={headCell.disablePadding ? 'none' : 'default'}
                  style={{width: headCell.width}}>
                  {headCell.label}
                </TableCell>)
              })
            }
          </TableRow>
        </TableHead>
        {/* // ドラッグアンドドロップの有効範囲 */}
        <DragDropContext onDragEnd={onDragEnd}>
          {/* ドロップできる範囲 */}
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <TableBody
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {/*　ドラッグできる要素　*/}
                {users.map((user, index) => (
                  <Draggable
                    key={user.id}
                    draggableId={"q-" + user.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <TableCell>
                          <DragHandleIcon />
                          {index + 1}
                        </TableCell>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.yyyymm}</TableCell>
                        <TableCell>{user.user_name}</TableCell>
                        <TableCell>{user.project_code}:{user.product_name}）{user.project_name}</TableCell>
                        <TableCell>{user.process_detail}</TableCell>
                        <TableCell>{user.hh}</TableCell>
                        <TableCell>{user.process_name}</TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </DragDropContext>
        </Table>
    </TableContainer>

  </>
);
}

export default UserDraggable;