import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

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
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const taskDetail = {
    id: 'T-001',
    name: 'Sanitization and Disinfection Project',
    deadline: '2024-03-15',
    description: `
    The project aims to implement a rigorous sanitization and disinfection program designed to safeguard the health and safety of our employees and visitors. This program includes frequent disinfection of high-touch surfaces, enhanced cleaning protocols, and the use of industry-leading cleaning products. `,
    status: 'Pending',
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function UserTaskDetails() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return '#ff9800'; // Orange for Pending
            case 'Complete':
                return '#4caf50'; // Green for Complete
            case 'Cancelled':
                return '#f44336'; // Red for Cancelled
            case 'Error':
                return '#fdd835'; // Yellow for Error
            case 'Verifying':
                return '#2196f3'; // Blue for Verifying
            default:
                return '#000'; // Default color
        }
    };

    const statusColor = getStatusColor(taskDetail.status);

    const renderStatusButtons = () => {
        if (taskDetail.status === 'Pending') {
            return (
                <React.Fragment>
                    <Button variant="contained" sx={{ mt: 1, backgroundColor: "#2196f3" }}>Verifying</Button>
                    <Button variant="contained" sx={{ mt: 1, ml: 1, backgroundColor: "#fdd835" }}>Error</Button>
                </React.Fragment>
            );
        }
        return null;
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} >
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Task Detail
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} >
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'justify',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <React.Fragment>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </React.Fragment>
                        <Divider sx={{ mb: 2 }} />
                        <React.Fragment>
                            <ListSubheader component="div" inset>
                                Services
                            </ListSubheader>
                            <ListItemButton>
                                <ListItemIcon>
                                    <BugReportIcon />
                                </ListItemIcon>
                                <ListItemText primary="Report" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </React.Fragment>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Container sx={{ background: 'white', boxShadow: 1, p: 2 }}>
                            <Toolbar
                                sx={{
                                    pl: { sm: 2 },
                                    pr: { xs: 1, sm: 1 },
                                    background: '#1976d2',
                                    color: 'white'
                                }}
                            >
                                <Typography
                                    sx={{ flex: '1 1 100%', }}
                                    variant="h5"
                                    id="tableTitle"
                                    component="div"
                                >
                                    {taskDetail.name}
                                </Typography>
                            </Toolbar>
                            <Box sx={{
                                outlineWidth: 1,
                                outlineColor: '#ddd',
                                outlineStyle: 'solid',
                                p: 2,
                            }}>
                                <Box sx={{ my: 0 }}>
                                    {taskDetail.description}
                                </Box>
                            </Box>
                            <Divider />
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            Status:
                                            <Box
                                                sx={{
                                                    ml: 1,
                                                    backgroundColor: statusColor, // Color for the small box
                                                    borderRadius: '4px', // Rounded corners for the box
                                                    color: '#fff', // Text color for better contrast
                                                    padding: '4px', // Padding inside the box
                                                }}
                                            >
                                                {taskDetail.status}
                                            </Box>
                                        </Box>
                                        <Box>Deadline: {taskDetail.deadline}</Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Box>
                                {renderStatusButtons()}
                            </Box>
                        </Container>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
