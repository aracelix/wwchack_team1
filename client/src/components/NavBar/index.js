import React from 'react';
import {
    AppBar,
    Badge,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@material-ui/core';
import {
    Menu as MenuIcon,
    More as MoreIcon,
    Eco as EcoIcon,
    Person as PersonIcon,
    List as ListIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Alfred from './ALFRED_SMOKE_LOGO.jpg';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        [theme.breakpoints.down('md')]: {
            top: 'auto',
            bottom: 0,
        }
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem>
            <IconButton color="secondary">
              <Badge>
                <EcoIcon />
              </Badge>
            </IconButton>
            <p>Dashboard</p>
          </MenuItem>
          <MenuItem>
            <IconButton color="secondary">
              <Badge>
                <PersonIcon />
              </Badge>
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          <MenuItem>
            <IconButton color="secondary">
              <ListIcon />
            </IconButton>
            <p>Links</p>
          </MenuItem>
        </Menu>
      );

      return (
          <div className={classes.grow}>
             <AppBar color='primary' className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color='inherit'
                        aria-label="open drawer"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <img height="60px" src={Alfred} />
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton color="secondary">
                        <Badge>
                            <EcoIcon />
                        </Badge>
                        </IconButton>
                        <p>Dashboard</p>
                
                        <IconButton color="secondary">
                        <Badge>
                            <PersonIcon />
                        </Badge>
                        </IconButton>
                        <p>Profile</p>

                        <IconButton color="secondary">
                        <ListIcon />
                        </IconButton>
                        <p>Links</p>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar> 
            {renderMobileMenu}
          </div>
      )
};

export default NavBar;