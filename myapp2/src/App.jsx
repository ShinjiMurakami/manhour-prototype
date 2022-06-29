import React, { useState } from 'react';
import Header from './modules/Header';
import Form from './modules/Form';
import List from './modules/List';
import Export from './modules/Export';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddUser from './modules/AddUser';
import { useAuth0 } from "@auth0/auth0-react";


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

  return (
    <>
      {isAuthenticated ? (
        // 認証済み時はログイン後の画面を表示
        <>
          <Router>
            {/* ヘッダー */}
            <Header />
            {/* フォーム */}
            <Form display={display} setDisplay={setDisplay} setFlag={setFlag} setValue={setValue} />
            {/* テーブル(検索結果の表示) */}
            <List searchResult={display} displayFlag={flag} postValue={value} />
            <Export postValue={value} />
            <Routes>
              <Route path="/adduser" element={<AddUser />} />
            </Routes>
            <div>
                <img src={user.picture} alt={user.name} />
                <h6>{user.name}({user.email})</h6>
                <button
                  onClick={() => {
                    logout({ returnTo: window.location.origin });
                  }}
                >
                Log out
                </button>
              </div>
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


