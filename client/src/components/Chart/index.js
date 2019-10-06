import React from 'react';
import { Card, CardContent, AppBar, Toolbar, IconButton, Typography, Badge, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import EcoIcon from '@material-ui/icons/Eco';
import PersonIcon from '@material-ui/icons/Person';
import ListIcon from '@material-ui/icons/List';
import { makeStyles } from '@material-ui/core/styles';
import '../../../node_modules/react-vis/dist/style.css';
import {
    XYPlot,
    makeVisFlexible,
    VerticalBarSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis
} from 'react-vis';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        top: 'auto',
        bottom: 0,
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


const Chart = () => {
    const FlexibleXYPlot = makeVisFlexible(XYPlot);
    const classes = useStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const data = [{
            x: 0,
            y: 8
        },
        {
            x: 1,
            y: 5
        },
        {
            x: 2,
            y: 4
        },
        {
            x: 3,
            y: 9
        },
        {
            x: 4,
            y: 1
        },
        {
            x: 5,
            y: 7
        },
        {
            x: 6,
            y: 6
        },
        {
            x: 7,
            y: 3
        },
        {
            x: 8,
            y: 2
        },
        {
            x: 9,
            y: 0
        }
    ];

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
            <AppBar position='fixed' color='primary' className={classes.appBar}>
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
                        Alfred
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
            <Card className="card dashboard-card">
                <CardContent>
                <FlexibleXYPlot>
                        <XAxis />
                        <YAxis / >
                        <VerticalGridLines />
                        <HorizontalGridLines / >
                    <VerticalBarSeries data={data} />
                </FlexibleXYPlot>
                </CardContent>
            </Card>
        {renderMobileMenu}
        </div>
    )
};
export default Chart;


