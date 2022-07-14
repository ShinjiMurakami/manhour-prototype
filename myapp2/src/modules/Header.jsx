import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItem from "@mui/material/ListItem";
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import ListItemText from "@mui/material/ListItemText";
import Button from '@mui/material/Button';

export default function Header(props) {
  const {user, logout, getUser, setUserinfo} = props;

  setUserinfo(user.email);

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            工数管理サイト
          </Typography>
          <Link to="/adduser">
            <ListItem button>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="社員入力ページ" />
            </ListItem>
          </Link>
          {getUser.length === 0 ? (
            <Typography variant="h6" component="div">
              未登録ユーザー
            </Typography>
          ) : (
            getUser.map(post => {
              if (post.is_admin_user === 1) {
                return (
                  <Typography variant="h6" component="div">
                    管理者：{user.name}({user.email})
                  </Typography>
                )
              } else {
                return (
                  <Typography variant="h6" component="div">
                    利用者：{user.name}({user.email})
                  </Typography>
                )
            }})
          )}
          <Button
            color="inherit"
            onClick={() => {
              logout({ returnTo: window.location.origin });
          }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}
