import * as React from 'react';
import { useState } from 'react';
import { styled, createTheme, ThemeProvider, alpha } from '@mui/material/styles';
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
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { PropTypes } from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import BugReportIcon from '@mui/icons-material/BugReport';
import LogoutIcon from '@mui/icons-material/Logout';

function createData(id, task, deadline, status) {
    return {
        id,
        task,
        deadline,
        numDays: calculateDaysRemaining(deadline),
        status,
    };
}

function calculateDaysRemaining(deadline) {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    const timeDifference = deadlineDate - currentDate;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysRemaining;
}

const rows = [
    createData('a1', 'Task 1', '2023-05-27', 'Pending'),
    createData('a2', 'Task 2', '2023-06-15', 'Complete'),
    createData('a3', 'Task 3', '2023-06-30', 'Error'),
    createData('a4', 'Task 4', '2023-07-10', 'Failed'),
    createData('a5', 'Task 5', '2023-07-20', 'Pending'),
    createData('a6', 'Task 6', '2023-08-05', 'Complete'),
    createData('a7', 'Task 7', '2023-08-15', 'Error'),
    createData('a8', 'Task 8', '2023-09-01', 'Failed'),
    createData('a9', 'Task 9', '2023-09-15', 'Pending'),
    createData('a10', 'Task 10', '2023-09-30', 'Complete'),
    createData('a11', 'Task 11', '2023-10-10', 'Error'),
    createData('a12', 'Task 12', '2023-10-25', 'Failed'),
    createData('a13', 'Task 13', '2023-11-05', 'Pending'),
    createData('a14', 'Task 14', '2023-11-20', 'Complete'),
    createData('a15', 'Task 15', '2023-12-01', 'Error'),
    createData('a16', 'Task 16', '2023-12-10', 'Failed'),
    createData('a17', 'Task 17', '2023-12-15', 'Pending'),
    createData('a18', 'Task 18', '2023-12-31', 'Complete'),
    createData('a19', 'Task 19', '2024-01-10', 'Error'),
    createData('a20', 'Task 20', '2024-01-25', 'Failed'),
    createData('a21', 'Task 21', '2024-02-05', 'Pending'),
    createData('a22', 'Task 22', '2024-02-20', 'Complete'),
    createData('a23', 'Task 23', '2024-03-01', 'Error'),
    createData('a24', 'Task 24', '2024-03-10', 'Failed'),
    createData('a25', 'Task 25', '2024-03-15', 'Pending'),
    createData('a26', 'Task 26', '2024-03-31', 'Complete'),
    createData('a27', 'Task 27', '2024-04-10', 'Error'),
    createData('a28', 'Task 28', '2024-04-25', 'Failed'),
    createData('a29', 'Task 29', '2024-05-05', 'Pending'),
    createData('a30', 'Task 30', '2024-05-20', 'Complete'),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'task',
        numeric: false,
        disablePadding: false,
        label: 'Task name',
    },
    {
        id: 'deadline',
        numeric: true,
        disablePadding: false,
        label: 'Deadline',
    },
    {
        id: 'numDays',
        numeric: true,
        disablePadding: false,
        label: 'Day(s) left',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar() {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Task Management
            </Typography>
        </Toolbar>
    );
}

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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function UserDashboard() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('deadline');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [currentStatusFilter, setCurrentStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        const nextPageStartIndex = newPage * rowsPerPage;
        const remainingRows = filteredRows.length - nextPageStartIndex;

        if (remainingRows >= 0) {
            setPage(newPage);
        }
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handleStatusFilter = (status) => {
        setCurrentStatusFilter(status);
        setPage(0); // Reset the page to the first page when a filter is applied
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setPage(0); // Reset the page to the first page when a filter is applied
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setPage(0); // Reset the page to the first page when a filter is applied
    };

    const filteredRows = rows.filter((row) => {
        return (
            (currentStatusFilter === 'All' || row.status === currentStatusFilter) &&
            (searchQuery === "" || row.task.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (startDate === null || new Date(row.deadline) >= startDate) &&
            (endDate === null || new Date(row.deadline) <= endDate)
        );
    });

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(filteredRows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, filteredRows],
    );

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
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
                            Dashboard
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
                            <ListSubheader component="div" inset>
                                Task Status
                            </ListSubheader>
                            <ListItemButton onClick={() => handleStatusFilter('All')}>
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="All" />
                            </ListItemButton>
                            <ListItemButton onClick={() => handleStatusFilter('Pending')}>
                                <ListItemIcon>
                                    <PendingIcon />
                                </ListItemIcon>
                                <ListItemText primary="Pending" />
                            </ListItemButton>
                            <ListItemButton onClick={() => handleStatusFilter('Complete')}>
                                <ListItemIcon>
                                    <CheckCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Complete" />
                            </ListItemButton>
                            <ListItemButton onClick={() => handleStatusFilter('Error')}>
                                <ListItemIcon>
                                    <ReportProblemIcon />
                                </ListItemIcon>
                                <ListItemText primary="Error" />
                            </ListItemButton>
                            <ListItemButton onClick={() => handleStatusFilter('Failed')}>
                                <ListItemIcon>
                                    <DisabledByDefaultIcon />
                                </ListItemIcon>
                                <ListItemText primary="Failed" />
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
                        <Box sx={{ flexGrow: 1 }}>
                            <AppBar position="static">
                                <Toolbar sx={{ justifyContent: 'space-between' }}>
                                    <Box sx={{ m: 1, flexDirection: 'row', display: 'flex' }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']} sx={{ p: 1, mr: 1 }}>
                                                <DatePicker
                                                    value={startDate}
                                                    onChange={handleStartDateChange}
                                                    label="Start Date"
                                                    sx={{ borderRadius: 1, backgroundColor: 'white' }}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']} sx={{ p: 1 }}>
                                                <DatePicker
                                                    value={endDate}
                                                    onChange={handleEndDateChange}
                                                    label="End Date"
                                                    sx={{ borderRadius: 1, backgroundColor: 'white' }}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Box>

                                    <Search>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Search…"
                                            inputProps={{ 'aria-label': 'search' }}
                                            value={searchQuery}
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value);
                                                setPage(0);
                                            }}
                                        />
                                    </Search>
                                </Toolbar>
                            </AppBar>
                        </Box>

                        <Divider sx={{ mb: 2 }}></Divider>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ width: '100%' }}>
                                        <Paper sx={{ width: '100%', mb: 2 }}>
                                            <EnhancedTableToolbar />
                                            <TableContainer>
                                                <Table
                                                    sx={{ minWidth: 750 }}
                                                    aria-labelledby="tableTitle"
                                                    size={dense ? 'small' : 'medium'}
                                                >
                                                    <EnhancedTableHead
                                                        order={order}
                                                        orderBy={orderBy}
                                                        onRequestSort={handleRequestSort}
                                                    />
                                                    <TableBody>
                                                        {visibleRows.map((row, index) => {
                                                            const labelId = `enhanced-table-checkbox-${index}`;

                                                            return (
                                                                <TableRow
                                                                    hover
                                                                    tabIndex={-1}
                                                                    key={row.id}
                                                                    sx={{ cursor: 'pointer' }}
                                                                >
                                                                    <TableCell
                                                                        component="th"
                                                                        id={labelId}
                                                                        scope="row"
                                                                    >
                                                                        {row.task}
                                                                    </TableCell>
                                                                    <TableCell align="right">{row.deadline}</TableCell>
                                                                    <TableCell align="right">{row.numDays}</TableCell>
                                                                    <TableCell align="right">{row.status}</TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                        {emptyRows > 0 && (
                                                            <TableRow
                                                                style={{
                                                                    height: (dense ? 33 : 53) * emptyRows,
                                                                }}
                                                            >
                                                                <TableCell colSpan={6} />
                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25]}
                                                component="div"
                                                count={rows.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />
                                        </Paper>
                                        <FormControlLabel
                                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                                            label="Dense padding"
                                        />
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
