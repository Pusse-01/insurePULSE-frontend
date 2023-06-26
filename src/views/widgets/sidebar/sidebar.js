// import Home from '../../screens/home/home';
// import Reports from '../../screens/reports/reports';

import * as React from 'react';
// import { useState } from 'react';
import {
    useNavigate
} from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import FindInPageIcon from '@mui/icons-material/FindInPage';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import UpgradeIcon from '@mui/icons-material/Upgrade';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer({ onLogout }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    // const [currentPage, setCurrentPage] = React.useState('Home');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        // setCurrentPage('Home');
    };

    // const pageComponents = {
    //     Home: <Home />,
    //     Reports: <Reports />,

    //     // Settings: <Settings />,
    //     // Upgrade: <Upgrade />,
    // };

    return (

        <Box
            sx={{ display: 'flex' }}
        >
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        INSUREPULSE
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        color="inherit"
                        aria-label="logout"
                        onClick={() => {
                            onLogout();
                            navigate('/login');
                        }}
                    // sx={{ marginLeft: 'auto' }}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem key="Home" disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() =>
                                navigate("/")
                                // setCurrentPage('Home')
                            }
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="Reports" disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() =>
                                navigate("/reports")
                                // setCurrentPage('Documents')
                            }
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <LibraryBooksIcon />
                            </ListItemIcon>
                            <ListItemText primary="Reports" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>

                    {/* Repeat the same pattern for other pages */}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <DrawerHeader />
                {/* {pageComponents[currentPage]} */}

            </Box>
        </Box>

    );
}
