import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link } from "react-router-dom";
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListItemText from "@material-ui/core/ListItemText";

export default function Header() {
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
          </Toolbar>
        </AppBar>
      </Box>
      </>
    );
  }
