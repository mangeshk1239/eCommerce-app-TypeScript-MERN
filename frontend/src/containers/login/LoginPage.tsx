import * as React from 'react';
import * as M from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Copyright(props: any) {
    return (
        <M.Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <M.Link color="inherit" href="https://mui.com/">
                Your Website
            </M.Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </M.Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = M.createTheme();

export default function LoginPage(): JSX.Element {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <M.ThemeProvider theme={defaultTheme}>
            <M.Grid container component="main" sx={{ height: '100vh' }}>
                <M.CssBaseline />
                <M.Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <M.Grid item xs={12} sm={8} md={5} component={M.Paper} elevation={6} square>
                    <M.Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <M.Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </M.Avatar>
                        <M.Typography component="h1" variant="h5">
                            Sign in
                        </M.Typography>
                        <M.Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <M.TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <M.TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <M.FormControlLabel
                                control={<M.Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <M.Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </M.Button>
                            <M.Grid container>
                                <M.Grid item xs>
                                    <M.Link href="#" variant="body2">
                                        Forgot password?
                                    </M.Link>
                                </M.Grid>
                                <M.Grid item>
                                    <M.Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </M.Link>
                                </M.Grid>
                            </M.Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </M.Box>
                    </M.Box>
                </M.Grid>
            </M.Grid>
        </M.ThemeProvider>
    );
}