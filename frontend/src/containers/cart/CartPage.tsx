import * as React from 'react';
import * as M from "@mui/material";
import AppBar from "../../components/AppBar";
import Drawer from "../../components/Drawer";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import Copyright from '../../components/Copyright';
import { useNavigate } from 'react-router-dom';
import { ParentContext } from '../../App';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = M.createTheme();

export default function CartPage(): JSX.Element {

    const fetchContext = React.useContext(ParentContext);
    const { state, dispatch } = fetchContext;

    const access_token: string | undefined = getCookie("access_token");

    // const { data, isSuccess } = useQuery<AxiosResponse, Error>(['getDashboardPageData'], getPageData);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const drawerWidth = 240;

    console.log("state", state);

    return (
        <div className="customPaperContainer">
            <M.ThemeProvider theme={defaultTheme}>
                <M.Box sx={{ display: 'flex' }}>
                    <M.CssBaseline />
                    <AppBar open={open} setOpen={setOpen} drawerWidth={drawerWidth} pageName={"Cart"} />
                    <Drawer open={open} setOpen={setOpen} drawerWidth={drawerWidth} />
                    <M.Box
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
                        <M.Toolbar />
                        <M.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <M.Grid container spacing={3}>
                                {/* Chart */}
                                <M.Grid item xs={12} md={8} lg={12}>
                                    <M.Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                        }}
                                    >
                                        <M.Container sx={{ py: 4 }} maxWidth="md">
                                            <M.Grid container spacing={4}>
                                                <M.Grid item xs={12} md={8} lg={6}>
                                                    <M.Typography color={"white"} variant="h4" gutterBottom>Your Cart</M.Typography>
                                                </M.Grid>
                                                <M.Grid item xs={12} md={8} lg={6}>
                                                    <M.Link sx={{ cursor: "pointer" }} onClick={() => navigate("/products")}>Continue Shopping</M.Link>
                                                </M.Grid>
                                            </M.Grid>

                                            <M.Grid container spacing={4}>
                                                <M.Grid item xs={12} md={8} lg={4}>
                                                    <M.Typography color={"white"} variant="body1" gutterBottom><b>PRODUCT</b></M.Typography>
                                                </M.Grid>
                                                <M.Grid item xs={12} md={8} lg={4}>
                                                    <M.Typography color={"white"} variant="body1" gutterBottom><b>QUANTITY</b></M.Typography>
                                                </M.Grid>
                                                <M.Grid item xs={12} md={8} lg={4}>
                                                    <M.Typography color={"white"} variant="body1" gutterBottom><b>TOTAL</b></M.Typography>
                                                </M.Grid>
                                            </M.Grid>
                                            <M.Divider sx={{ border: "1px solid white" }} />
                                        </M.Container>
                                    </M.Paper>
                                </M.Grid>
                            </M.Grid>
                            <Copyright sx={{ pt: 4 }} />
                        </M.Container>
                    </M.Box>
                </M.Box>
            </M.ThemeProvider>
        </div>
    );

    async function getPageData(): Promise<AxiosResponse> {
        return await axios.get("/api/account/dashboard", {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(response => response.data);
    }

    function getCookie(name: string): string | undefined {
        const value = `; ${document.cookie}`;
        const parts: any = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
}