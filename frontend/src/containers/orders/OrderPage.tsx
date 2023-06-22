import * as React from 'react';
import * as M from "@mui/material";
import AppBar from "../../components/AppBar";
import Drawer from "../../components/Drawer";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import Copyright from '../../components/Copyright';
import { useNavigate } from 'react-router-dom';
import { IOrder } from '../../resources/interface';

const defaultTheme = M.createTheme();

const StyledTableCell = M.styled(M.TableCell)(({ theme }) => ({
    [`&.${M.tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${M.tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = M.styled(M.TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function OrderPage(): JSX.Element {

    const navigate = useNavigate();

    const access_token: string | undefined = getCookie("access_token");

    const { data, isSuccess, error } = useQuery<AxiosResponse, Error>({
        queryKey: ['getOrderPageData'],
        queryFn: getPageData,
        cacheTime: 0,
        retry: false
    });

    const [open, setOpen] = React.useState<boolean>(true);
    const drawerWidth = 240;

    isAuthenticated(error);

    return (
        <div className="customPaperContainer">
            <M.ThemeProvider theme={defaultTheme}>
                <M.Box sx={{ display: 'flex' }}>
                    <M.CssBaseline />
                    <AppBar open={open} setOpen={setOpen} drawerWidth={drawerWidth} pageName={"Orders"} />
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
                                <M.Grid item xs={12}>
                                    <M.Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <M.Container sx={{ py: 4 }} maxWidth="lg">
                                            {
                                                isSuccess && data?.data
                                                    ?
                                                    <M.Grid container spacing={4}>
                                                        <M.TableContainer component={M.Paper}>
                                                            <M.Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                                <M.TableHead>
                                                                    <M.TableRow>
                                                                        <StyledTableCell align="center">Sr. No.</StyledTableCell>
                                                                        <StyledTableCell align="center">Order ID</StyledTableCell>
                                                                        <StyledTableCell align="center">Order Products</StyledTableCell>
                                                                        <StyledTableCell align="center">Order Total</StyledTableCell>
                                                                        <StyledTableCell align="center">Order Date</StyledTableCell>
                                                                    </M.TableRow>
                                                                </M.TableHead>
                                                                <M.TableBody>
                                                                    {
                                                                        data?.data?.map((order: IOrder, index) => (
                                                                            <StyledTableRow key={index}>
                                                                                <StyledTableCell component="th" align="left" scope="row">{index + 1}</StyledTableCell>
                                                                                <StyledTableCell component="th" align="left" scope="row">{order.orderID}</StyledTableCell>
                                                                                <StyledTableCell align="center">
                                                                                    <M.List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                                                        {
                                                                                            order.lineItems.map((product) => {
                                                                                                return <M.ListItem alignItems="flex-start">
                                                                                                    <M.ListItemAvatar>
                                                                                                        <M.Avatar alt="Remy Sharp" src={product.product_image} />
                                                                                                    </M.ListItemAvatar>
                                                                                                    <M.ListItemText
                                                                                                        primary={product.product_name}
                                                                                                        secondary={
                                                                                                            <React.Fragment>
                                                                                                                <M.Typography
                                                                                                                    sx={{ display: 'inline' }}
                                                                                                                    component="span"
                                                                                                                    variant="body2"
                                                                                                                    color="text.primary"
                                                                                                                >
                                                                                                                    Quantity:
                                                                                                                </M.Typography>
                                                                                                                {` ${product.product_quantity}`}
                                                                                                            </React.Fragment>
                                                                                                        }
                                                                                                    />
                                                                                                </M.ListItem>
                                                                                            })
                                                                                        }
                                                                                    </M.List>
                                                                                </StyledTableCell>
                                                                                <StyledTableCell align="right">${order.orderTotal}</StyledTableCell>
                                                                                <StyledTableCell align="right">{order.createdAt}</StyledTableCell>
                                                                            </StyledTableRow>
                                                                        ))
                                                                    }
                                                                </M.TableBody>
                                                            </M.Table>
                                                        </M.TableContainer>
                                                    </M.Grid>
                                                    :
                                                    <><M.CircularProgress /></>
                                            }
                                        </M.Container>
                                    </M.Paper>
                                </M.Grid>
                            </M.Grid>
                            <Copyright sx={{ pt: 4 }} />
                        </M.Container>

                    </M.Box>
                </M.Box>
            </M.ThemeProvider>
        </div >
    );

    async function getPageData(): Promise<AxiosResponse> {
        return await axios.get("/api/account/orders", {
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

    function isAuthenticated(error: any) {
        if (error?.response.status === 401) return navigate("/login");
    }

}