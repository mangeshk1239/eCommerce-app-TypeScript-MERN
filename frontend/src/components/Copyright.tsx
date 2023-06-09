import * as M from "@mui/material";

export default function Copyright(props: any) {
    return (
        <M.Typography variant="body2" color={"white"} align="center" {...props}>
            {'Copyright © '}
            <M.Link color="inherit" href="https://mui.com/">
                Your Website
            </M.Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </M.Typography>
    );
}