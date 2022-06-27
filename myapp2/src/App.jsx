import React, { useState } from 'react';
import Header from './modules/Header';
import Form from './modules/Form';
import List from './modules/List';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddUser from './modules/AddUser';


export default function App() {
  const [flag, setFlag] = useState(false);
  const [value, setValue] = useState('');
  const [display, setDisplay] = useState({
    id: 0,
    yyyymm: "",
    user_name: "",
    project_code: "",
    product_name: "",
    project_name: "",
    process_name: "",
    hh: 0,
    process_detail: ""
  });

  return (
    <>
      <Router>
        {/* ヘッダー */}
        <Header />
        {/* フォーム */}
        <Form display={display} setDisplay={setDisplay} setFlag={setFlag} setValue={setValue} />
        {/* テーブル(検索結果の表示) */}
        <List searchResult={display} displayFlag={flag} postValue={value} />
        <Routes>
          <Route path="/adduser" element={<AddUser />} />
        </Routes>
      </Router>
    </>
  )
}


