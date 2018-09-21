import React from 'react'
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SvgIcon from '@material-ui/core/SvgIcon';

import "./Styles.css"
import { Button } from '@material-ui/core';

const headerName = "{Okta} Demo";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    paddingTop: 12
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};


class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: true,
      anchorEl: null
    };
  }

  onMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  onClose = () => {
    this.setState({ anchorEl: null });
  }

  render() {

    const open = Boolean(this.state.anchorEl);

    return (
      <div className={styles.root}>
        <AppBar position="static" style={{ backgroundColor: "#222" }}>
          <ToolBar >
            <Grid container spacing={16} alignItems={'flex-start'} direction={'row'} justify={'space-between'} >

              <IconButton color="inherit" aria-label="Menu">
                <Icon color="primary" >trip_origin</Icon>
              </IconButton>

              {/* <Typography variant="title" align='center' color="inherit" className="typo" >
                Okta Demo
              </Typography> */}
              <Button color="inherit">
                <Typography variant="title" align='center' color="inherit" className="typo" >
                  Okta Demo
                </Typography> 
              </Button>

              {this.state.auth && (
                <div>
                  <IconButton color="inherit" 
                              aria-owns={open ? 'menu-appbar' : null}
                              aria-haspopup="true"
                              onClick={this.onMenu}

                              >
                    <AccountCircle />
                  </IconButton>
                  <IconButton color="inherit" aria-label="Github">
                    <SvgIcon>
                      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 
                      1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 
                      0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 
                      5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"></path>
                    </SvgIcon>
                  </IconButton>
                  <Menu 
                    id="menu-appbar" 
                    anchorEl={this.state.anchorEl} 
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={open}
                    onClose={this.onClose}
                    >
                    <MenuItem onClick={this.onClose}>Profile</MenuItem>
                    <MenuItem onClick={this.onClose}>My Account</MenuItem>
                  </Menu>
                </div>
              )}


            </Grid>
          </ToolBar>
        </AppBar>
      </div>
    )
  }
}



export default Header;