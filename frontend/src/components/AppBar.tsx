import * as M from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

interface IProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    drawerWidth: number
}

export default function AppBar({ open, setOpen, drawerWidth }: IProps): JSX.Element {

    const Appbar = M.styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
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

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Appbar position="absolute" open={open}>
            <M.Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <M.IconButton
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
                </M.IconButton>
                <M.Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Dashboard
                </M.Typography>
                <M.IconButton color="inherit">
                    <M.Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </M.Badge>
                </M.IconButton>
            </M.Toolbar>
        </Appbar>
    )
}