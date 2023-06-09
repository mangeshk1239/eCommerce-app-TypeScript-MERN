import * as M from "@mui/material";
import * as React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

interface IProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    drawerWidth: number
    pageName: string
}

export default function AppBar({ open, setOpen, drawerWidth, pageName }: IProps): JSX.Element {

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

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                    {pageName}
                </M.Typography>
                <M.IconButton color="inherit">
                    <M.Tooltip title="Account settings">
                        <M.IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={isOpen ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={isOpen ? 'true' : undefined}
                        >
                            <M.Avatar sx={{ width: 32, height: 32 }}>M</M.Avatar>
                        </M.IconButton>
                    </M.Tooltip>
                </M.IconButton>
            </M.Toolbar>
            <M.Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={isOpen}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <M.MenuItem onClick={handleClose}>
                    <M.Avatar /> My account
                </M.MenuItem>
                <M.Divider />
                <M.MenuItem onClick={handleClose}>
                    <M.ListItemIcon>
                        <Logout fontSize="small" />
                    </M.ListItemIcon>
                    Logout
                </M.MenuItem>
            </M.Menu>
        </Appbar>
    )
}