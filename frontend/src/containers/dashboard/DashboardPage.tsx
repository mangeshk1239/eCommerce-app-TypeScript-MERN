import * as React from 'react';
import * as M from "@mui/material";
import AppBar from "../../components/AppBar";
import Drawer from "../../components/Drawer";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = M.createTheme();

export default function DashboardPage(): JSX.Element {

    const navigate = useNavigate();
    const access_token: string | undefined = getCookie("access_token");

    const { error } = useQuery<AxiosResponse, Error>({
        queryKey: ['getDashboardPageData'],
        queryFn: getPageData,
        cacheTime: 0,
        retry: false
    });

    const [open, setOpen] = React.useState(true);
    const drawerWidth = 240;

    isAuthenticated(error);

    return (
        <div className="customPaperContainer">
            <M.ThemeProvider theme={defaultTheme}>
                <M.Box sx={{ display: 'flex' }}>
                    <M.CssBaseline />
                    <AppBar open={open} setOpen={setOpen} drawerWidth={drawerWidth} pageName={"Dashboard"} />
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
                                <M.Grid item xs={12} md={8} lg={9}>
                                    <M.Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                        }}
                                    >
                                    </M.Paper>
                                </M.Grid>
                                {/* Recent Deposits */}
                                <M.Grid item xs={12} md={4} lg={3}>
                                    <M.Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                        }}
                                    >
                                    </M.Paper>
                                </M.Grid>
                                {/* Recent Orders */}
                                <M.Grid item xs={12}>
                                    <M.Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    </M.Paper>
                                </M.Grid>
                            </M.Grid>
                            {/* <Copyright sx={{ pt: 4 }} /> */}
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

    function isAuthenticated(error) {
        if (error?.response.status === 401) return navigate("/login");
    }
    
}