import * as React from 'react';
import * as M from "@mui/material";
import { ParentContext } from '../../App';
import { ICartItem } from '../../resources/interface';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {
    const fetchContext = React.useContext(ParentContext);
    const { state, dispatch } = fetchContext;

    let total: number | undefined;
    if (state) {
        total = state.CART.map((ele: ICartItem) => ele.product_price * ele.product_quantity).reduce((a: number, b: number) => a + b, 0);
    }

    return (
        <React.Fragment>
            <M.Typography variant="h6" gutterBottom>
                Order summary
            </M.Typography>
            <M.List disablePadding>
                {state.CART.map((item: ICartItem) => (
                    <M.ListItem key={item.product_id} sx={{ py: 1, px: 0 }}>
                        <M.ListItemText primary={item.product_name} secondary={`Quantity: ${item.product_quantity}`} />
                        <M.Typography variant="body2">${item.product_price * item.product_quantity}</M.Typography>
                    </M.ListItem>
                ))}
                <M.ListItem sx={{ py: 1, px: 0 }}>
                    <M.ListItemText primary="Total" />
                    <M.Typography variant="subtitle1" sx={{ fontWeight: 700 }}>${total}</M.Typography>
                </M.ListItem>
            </M.List>
            <M.Grid container spacing={2}>
                <M.Grid item xs={12} sm={6}>
                    <M.Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </M.Typography>
                    <M.Typography gutterBottom>John Smith</M.Typography>
                    <M.Typography gutterBottom>{addresses.join(', ')}</M.Typography>
                </M.Grid>
                <M.Grid item container direction="column" xs={12} sm={6}>
                    <M.Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </M.Typography>
                    <M.Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <M.Grid item xs={6}>
                                    <M.Typography gutterBottom>{payment.name}</M.Typography>
                                </M.Grid>
                                <M.Grid item xs={6}>
                                    <M.Typography gutterBottom>{payment.detail}</M.Typography>
                                </M.Grid>
                            </React.Fragment>
                        ))}
                    </M.Grid>
                </M.Grid>
            </M.Grid>
        </React.Fragment>
    );
}