import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import LogoutIcon from '@mui/icons-material/Logout';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

const names = [
    {
        id: 'a1',
        name: 'Oliver Hansen'
    },
    {
        id: 'a2',
        name: 'Van Henry'
    },
    {
        id: 'a3',
        name: 'April Tucker'
    },
    {
        id: 'a4',
        name: 'Ralph Hubbard'
    },
    {
        id: 'a5',
        name: 'Omar Alexander'
    },
    {
        id: 'a6',
        name: 'Carlos Abbott'
    },
    {
        id: 'a7',
        name: 'Miriam Wagner'
    },
    {
        id: 'a8',
        name: 'Bradley Wilkerson'
    },
    {
        id: 'a9',
        name: 'Virginia Andrews'
    },
    {
        id: 'a10',
        name: 'Kelly Snyder'
    }
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AddTask() {
    const [name, setName] = React.useState(''); // State for name input
    const [description, setDescription] = React.useState(''); // State for description input
    const [deadline, setDeadline] = React.useState(''); // State for deadline input
    const [assignee, setAssignee] = React.useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDeadlineChange = (event) => {
        setDeadline(event.target.value);
    };

    const handleAssigneeChange = (event) => {
        setAssignee(event.target.value);
    };

    const handleAddTask = () => {
        const selectedAssignee = names.find((assigneeObj) => assigneeObj.name === assignee);
        
        if (!selectedAssignee) {
            console.error("Invalid assignee selected");
            return;
        }

        const taskData = {
            name: name,
            description: description,
            deadline: deadline,
            dateAdded: new Date().toLocaleDateString(),
            assignee: {
                id: selectedAssignee.id,
                name: selectedAssignee.name,
            },
        };
        
        console.log(taskData); 
    };

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} sx={{ background: 'orange' }}>
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
                            Add Task
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
                        <React.Fragment>
                            <Box sx={{
                                background: "white",
                                p: 2,
                                pb: 1,
                                pt: 3,
                                mb: 4,
                                boxShadow: 1,
                            }}>
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='primary'
                                    label="Name"
                                    fullWidth
                                    required
                                    sx={{ mb: 4 }}
                                    value={name}
                                    onChange={handleNameChange} // Add onChange handler
                                />
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='primary'
                                    label="Description"
                                    fullWidth
                                    required
                                    multiline
                                    sx={{ mb: 4 }}
                                    value={description}
                                    onChange={handleDescriptionChange} // Add onChange handler
                                />
                                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                    }}>
                                        Deadline:
                                        <TextField
                                            type="date"
                                            variant='outlined'
                                            color='primary'
                                            fullWidth
                                            required
                                            sx={{ ml: 2 }}
                                            value={deadline}
                                            onChange={handleDeadlineChange} // Add onChange handler
                                        />
                                    </Box>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Assignee"
                                            value={assignee}
                                            onChange={handleAssigneeChange}
                                        >
                                            {names.map((assignees) => (
                                                <MenuItem key={assignees.id} value={assignees.name}>{assignees.name}</MenuItem>
                                            ))}
                                            {/* <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                                <Button onClick={handleAddTask} variant="contained" color="inherit" type="submit" sx={{ background: "orange", px: 5 }}>Add Task</Button>
                            </Box>
                        </React.Fragment>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
