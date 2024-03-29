import * as React from "react";
import * as M from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from '@mui/material/Drawer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DraftsIcon from '@mui/icons-material/Drafts';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from 'react-router-dom';

interface IProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    drawerWidth: number
}

export default function Drawer({ open, setOpen, drawerWidth }: IProps): JSX.Element {

    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const Drawer = M.styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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

    return (
        <div className="customDrawerContainer">
            <Drawer variant="permanent" open={open}>
                <M.Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <M.IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </M.IconButton>
                </M.Toolbar>
                <M.Divider />
                <M.List component="nav">
                    <React.Fragment>
                        <M.ListItemButton onClick={() => navigate("/dashboard")}>
                            <M.ListItemIcon>
                                <DashboardIcon />
                            </M.ListItemIcon>
                            <M.ListItemText primary="Dashboard" />
                        </M.ListItemButton>
                        <M.ListItemButton onClick={() => navigate("/products")}>
                            <M.ListItemIcon>
                                <InventoryIcon />
                            </M.ListItemIcon>
                            <M.ListItemText primary="Products" />
                        </M.ListItemButton>
                        <M.ListItemButton onClick={() => navigate("/orders")}>
                            <M.ListItemIcon>
                                <DraftsIcon />
                            </M.ListItemIcon>
                            <M.ListItemText primary="Orders" />
                        </M.ListItemButton>
                        <M.ListItemButton onClick={() => navigate("/cart")}>
                            <M.ListItemIcon>
                                <ShoppingCartIcon />
                            </M.ListItemIcon>
                            <M.ListItemText primary="Cart" />
                        </M.ListItemButton>
                    </React.Fragment>
                    <M.Divider sx={{ my: 1 }} />
                </M.List>
            </Drawer>
        </div>
    )
}