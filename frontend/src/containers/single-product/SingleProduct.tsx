import * as React from 'react';
import * as M from "@mui/material";
import AppBar from "../../components/AppBar";
import Drawer from "../../components/Drawer";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import Copyright from '../../components/Copyright';
import Quantity from "../../components/Quantity";
import { ParentContext, ACTION } from '../../App';
import { useNavigate } from 'react-router-dom';

interface IProduct {
    brand: string,
    category: string,
    description: string,
    discountPercentage: number,
    id: number,
    images: string[],
    price: number,
    rating: number,
    stock: number,
    thumbnail: string,
    title: string,
}

interface ICartItem {
    product_id: number,
    product_name: string,
    product_price: number | undefined,
    product_quantity: number,
    product_image: string
}

const defaultTheme = M.createTheme();

export default function SingleProductPage(): JSX.Element {

    const navigate = useNavigate();
    const access_token: string | undefined = getCookie("access_token");

    const { data, isSuccess, error } = useQuery<AxiosResponse, Error>({
        queryKey: [`getSingleProductData${window.location.pathname.replace("/product/", "")}`],
        queryFn: getPageData,
        cacheTime: 0,
        retry: false
    });

    const fetchContext = React.useContext(ParentContext);
    const { state, dispatch } = fetchContext;

    let discount_price: number | undefined;

    if (data) {
        discount_price = Number((data?.price - (data?.price * data?.discountPercentage) / 100).toFixed(0));
    }

    const [open, setOpen] = React.useState<boolean>(true);
    const [quantity, setQuantity] = React.useState<number>(1);
    const drawerWidth = 240;

    isAuthenticated(error);

    return (
        <div className="customPaperContainer">
            <M.ThemeProvider theme={defaultTheme}>
                <M.Box sx={{ display: 'flex' }}>
                    <M.CssBaseline />
                    <AppBar open={open} setOpen={setOpen} drawerWidth={drawerWidth} pageName={"Single Product"} />
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
                                <M.Grid item xs={6}>
                                    <M.Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <M.Container sx={{ py: 4 }} maxWidth="md">
                                            {
                                                isSuccess && data
                                                    ?
                                                    <M.Grid container spacing={4}>
                                                        <M.Grid item xs={12} md={8} lg={9}>
                                                            <img src={data?.thumbnail} />
                                                            <div>
                                                                {
                                                                    data?.images.map((image: string, index: number) => {
                                                                        return <img key={index} src={image} width={100} />
                                                                    })
                                                                }
                                                            </div>
                                                        </M.Grid>
                                                    </M.Grid>
                                                    :
                                                    <><M.CircularProgress /></>
                                            }
                                        </M.Container>
                                    </M.Paper>
                                </M.Grid>

                                <M.Grid item xs={6}>
                                    <M.Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <M.Container sx={{ py: 4 }} maxWidth="md">
                                            {
                                                isSuccess && data
                                                    ?
                                                    <M.Grid container spacing={4}>
                                                        <M.Grid item xs={12} md={8} lg={9}>
                                                            <M.Typography color={"white"} variant="body1" gutterBottom>{data?.brand}</M.Typography>
                                                            <M.Typography color={"white"} variant="h2" gutterBottom><b>{data?.title}</b></M.Typography>
                                                            <M.Typography color={"white"} variant="h5" gutterBottom><s>${data?.price}</s>&nbsp;<u><i>${discount_price}</i></u></M.Typography>
                                                            <Quantity quantity={quantity} setQuantity={setQuantity} />
                                                            <M.Typography color={"white"} variant="body2" gutterBottom><b>{data?.description}</b></M.Typography>
                                                            <M.Button onClick={() => handleCart(data)} sx={{ marginTop: "5%" }} variant="contained">Add to Cart</M.Button>
                                                        </M.Grid>
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
        </div>
    );

    async function getPageData(): Promise<IProduct> {
        return await axios.get("/api/account/products", {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(response => response.data.data.products.find((product: IProduct) => product.id === Number(window.location.pathname.replace("/product/", ""))))
    }

    function getCookie(name: string): string | undefined {
        const value = `; ${document.cookie}`;
        const parts: any = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function handleCart(data): void {

        const payload: ICartItem = {
            product_id: data.id,
            product_name: data.title,
            product_price: discount_price,
            product_quantity: quantity,
            product_image: data.thumbnail
        };

        dispatch({ type: ACTION.CART, payload });
    }

    function isAuthenticated(error) {
        if (error?.response.status === 401) return navigate("/login");
    }
    
}