import * as React from 'react';
import * as M from "@mui/material";
import AppBar from "../../components/AppBar";
import Drawer from "../../components/Drawer";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import Copyright from '../../components/Copyright';
import { useNavigate } from 'react-router-dom';

interface ICard {
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

const defaultTheme = M.createTheme();

export default function ProductPage(): JSX.Element {

    const navigate = useNavigate();

    const access_token: string | undefined = getCookie("access_token");

    const { data, isSuccess, error } = useQuery<AxiosResponse, Error>({
        queryKey: ['getProductPageData'],
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
                    <AppBar open={open} setOpen={setOpen} drawerWidth={drawerWidth} pageName={"Products"} />
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
                                        <M.Container sx={{ py: 4 }} maxWidth="md">
                                            {
                                                isSuccess && data?.data
                                                    ?
                                                    <M.Grid container spacing={4}>
                                                        {
                                                            data?.data?.products.map((card: ICard) => (
                                                                <M.Grid item key={card.id} xs={12} sm={6} md={4}>
                                                                    <M.Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                                                                        <M.CardMedia component="div" sx={{ pt: '56.25%', }} image={card.thumbnail} />
                                                                        <M.CardContent sx={{ flexGrow: 1 }}>
                                                                            <M.Typography gutterBottom variant="h5" component="h2">{card.title}</M.Typography>
                                                                            <M.Typography><s>${card.price}</s>&nbsp;<b><i>${Number((card.price - (card.price * card.discountPercentage) / 100).toFixed(0))}</i></b></M.Typography>
                                                                        </M.CardContent>
                                                                        <M.CardActions>
                                                                            <M.Button size="small" onClick={() => { navigate(`/product/${card.id}`) }}>View</M.Button>
                                                                        </M.CardActions>
                                                                    </M.Card>
                                                                </M.Grid>
                                                            ))
                                                        }
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

    async function getPageData(): Promise<AxiosResponse> {
        return await axios.get("/api/account/products", {
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