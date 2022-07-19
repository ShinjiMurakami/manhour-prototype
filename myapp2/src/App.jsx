import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './modules/Header';
import Form from './modules/Form';
import List from './modules/List';
import Export from './modules/Export';
import UserDraggableBeautiful from './modules/UserDraggable_beautiful';
import UserDraggableSmooth from './modules/UserDraggable_smooth';
import AddUser from './modules/AddUser';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';


export default function App() {
  const RedirectToLogin = () => {
    const { loginWithRedirect } = useAuth0();
    loginWithRedirect();
    return <></>;
  };
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
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

  const baseURL = process.env.REACT_APP_BASEURL;
  console.log(baseURL);
  const [data, setData] = useState('');
  const [userinfo, setUserinfo] = useState('');

  useEffect(() => {
    getUserInfo(userinfo);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userinfo]);

  const getUserInfo = (userinfo) => {
    const params = new URLSearchParams();
    params.append('search', userinfo);
    axios.post(`${baseURL}/userinfo`, params)
        .then(response => response.data)
        .then((result) => {
          setData(result);
        })
        .catch(function (error) {
            console.log("error", error);
        })
  };

  return (
    <>
      {isAuthenticated ? (
        // 認証済み時はログイン後の画面を表示
        <>
          <Router>
            {/* ヘッダー */}
            <Header user={user} logout={logout} getUser={data} setUserinfo={setUserinfo} />
            {/* フォーム */}
            <Form display={display} setDisplay={setDisplay} setFlag={setFlag} setValue={setValue} />
            {/* テーブル(検索結果の表示) */}
            <List searchResult={display} displayFlag={flag} postValue={value} />
            {data.map(post => {
              if (post.is_admin_user === 1) {
                return (<Export postValue={value} />)
              } else {
                return null
              }
            })}
            <UserDraggableSmooth postValue={value} />
            <UserDraggableBeautiful postValue={value} />
            <Routes>
              <Route path="/adduser" element={<AddUser />} />
            </Routes>
          </Router>
        </>
      ) : isLoading ? (
        // ログイン試行中はローディング画面を表示
        <>
          <div>Loading...</div>
        </>
      ) : (
        // 未認証時はAuth0のログイン画面にリダイレクト
        <>
          <RedirectToLogin />
        </>
      )}
    </>
  )
}


