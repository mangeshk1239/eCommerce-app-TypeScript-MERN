import * as React from 'react';
import * as M from "@mui/material";
import AppBar from "../../components/AppBar";
import Drawer from "../../components/Drawer";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import Copyright from '../../components/Copyright';
import { useNavigate } from 'react-router-dom';
import { ParentContext } from '../../App';

interface ICartItem {
    product_id: number,
    product_name: string,
    product_price: number | undefined,
    product_quantity: number,
    product_image: string
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = M.createTheme();

export default function CartPage(): JSX.Element {

    const navigate = useNavigate();
    const access_token: string | undefined = getCookie("access_token");

    const { data, isSuccess, error } = useQuery<AxiosResponse, Error>({
        queryKey: ['getCartPageData'],
        queryFn: getPageData,
        cacheTime: 0,
        retry: false
    });

    const fetchContext = React.useContext(ParentContext);
    const { state, dispatch } = fetchContext;

    const [open, setOpen] = React.useState<boolean>(true);
    const drawerWidth = 240;

    let subTotal: number;

    if (state) {
        subTotal = state.CART.map(ele => ele.product_price * ele.product_quantity).reduce((a: number, b: number) => a + b, 0);
    }

    isAuthenticated(error);

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
                                        }}
                                    >
                                        <M.Container sx={{ py: 4 }} maxWidth="md">

                                            <M.Grid container spacing={4}>
                                                <M.Grid item xs={12} md={8} lg={6} sx={{ textAlign: "left" }}>
                                                    <M.Typography color={"white"} variant="h4" gutterBottom>Your Cart</M.Typography>
                                                </M.Grid>
                                                <M.Grid item xs={12} md={8} lg={6} sx={{ textAlign: "right" }}>
                                                    <M.Link sx={{ cursor: "pointer" }} onClick={() => navigate("/products")}><b><i>Continue Shopping</i></b></M.Link>
                                                </M.Grid>
                                            </M.Grid>

                                            <M.Grid container spacing={4} sx={{ paddingTop: "2%" }}>
                                                <M.Grid item xs={12} md={8} lg={4} sx={{ textAlign: "left" }}>
                                                    <M.Typography color={"white"} variant="body1" gutterBottom><b>PRODUCT</b></M.Typography>
                                                </M.Grid>
                                                <M.Grid item xs={12} md={8} lg={4} sx={{ textAlign: "center" }}>
                                                    <M.Typography color={"white"} variant="body1" gutterBottom><b>QUANTITY</b></M.Typography>
                                                </M.Grid>
                                                <M.Grid item xs={12} md={8} lg={4} sx={{ textAlign: "right" }}>
                                                    <M.Typography color={"white"} variant="body1" gutterBottom><b>TOTAL</b></M.Typography>
                                                </M.Grid>
                                            </M.Grid>
                                            <M.Divider sx={{ border: "1px solid white" }} />
                                            {
                                                state.CART.length > 0 ?
                                                    <>
                                                        {
                                                            state.CART.map((item: ICartItem) => {
                                                                return <M.Grid key={item.product_id} container spacing={4} sx={{ paddingTop: "2%" }}>
                                                                    <M.Grid item xs={12} md={8} lg={4} sx={{ color: "white", textAlign: "left" }}>
                                                                        <div style={{ display: "flex", gap: "5%" }}>
                                                                            <div>
                                                                                <img src={item.product_image} width={100} height={100} />
                                                                            </div>
                                                                            <div>
                                                                                <p><b>{item.product_name}</b></p>
                                                                                <p>${item.product_price}</p>
                                                                            </div>
                                                                        </div>
                                                                    </M.Grid>
                                                                    <M.Grid item xs={12} md={8} lg={4} sx={{ color: "white", textAlign: "center" }}>{item.product_quantity}</M.Grid>
                                                                    <M.Grid item xs={12} md={8} lg={4} sx={{ color: "white", textAlign: "right" }}>${item.product_price as number * item.product_quantity}</M.Grid>
                                                                </M.Grid>
                                                            })
                                                        }
                                                        <M.Divider sx={{ border: "1px solid white", marginTop: "1%" }} />
                                                        <M.Grid container spacing={4} sx={{ paddingTop: "2%", textAlign: "right" }}>
                                                            <M.Grid item xs={12} md={8} lg={12} >
                                                                <M.Typography color={"white"} variant="body1" gutterBottom>Subtotal: <b>${subTotal}</b></M.Typography>
                                                            </M.Grid>
                                                            <M.Grid item xs={12} md={8} lg={12} >
                                                                <M.Button onClick={() => navigate("/checkout")} variant="contained" size="large">Checkout</M.Button>
                                                            </M.Grid>
                                                        </M.Grid>
                                                    </>
                                                    :
                                                    <div style={{ textAlign: "center" }}>
                                                        <M.Typography sx={{ paddingTop: "5%", fontSize: "30px" }} color={"white"} variant="body1" gutterBottom><b>Your Cart is Empty</b></M.Typography>
                                                    </div>

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
        </div>
    );

    async function getPageData(): Promise<AxiosResponse> {
        return await axios.get("/api/account/cart", {
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