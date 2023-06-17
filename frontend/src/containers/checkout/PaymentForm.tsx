import * as React from 'react';
import * as M from "@mui/material";
import { ParentContext } from '../../App';
import { ACTION } from '../../App';

export default function PaymentForm() {

    const fetchContext = React.useContext(ParentContext);
    const { state, dispatch } = fetchContext;


    return (
        <React.Fragment>
            <M.Typography variant="h6" gutterBottom>
                Payment method
            </M.Typography>
            <M.Grid container spacing={3}>
                <M.Grid item xs={12} md={6}>
                    <M.TextField
                        required
                        id="cardName"
                        label="Name on card"
                        fullWidth
                        autoComplete="cc-name"
                        variant="standard"
                        value={state.CHECKOUT_PAYMENT.card_name}
                        onChange={(e) => dispatch({ type: ACTION.CHECKOUT_PAYMENT.card_name, payload: e.target.value })}
                    />
                </M.Grid>
                <M.Grid item xs={12} md={6}>
                    <M.TextField
                        required
                        id="cardNumber"
                        label="Card number"
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                        value={state.CHECKOUT_PAYMENT.card_number}
                        onChange={(e) => dispatch({ type: ACTION.CHECKOUT_PAYMENT.card_number, payload: e.target.value })}
                    />
                </M.Grid>
                <M.Grid item xs={12} md={6}>
                    <M.TextField
                        required
                        id="expDate"
                        label="Expiry date"
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                        value={state.CHECKOUT_PAYMENT.card_expiry}
                        onChange={(e) => dispatch({ type: ACTION.CHECKOUT_PAYMENT.card_expiry, payload: e.target.value })}
                    />
                </M.Grid>
                <M.Grid item xs={12} md={6}>
                    <M.TextField
                        required
                        id="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                        value={state.CHECKOUT_PAYMENT.card_cvv}
                        onChange={(e) => dispatch({ type: ACTION.CHECKOUT_PAYMENT.card_cvv, payload: e.target.value })}
                    />
                </M.Grid>
                <M.Grid item xs={12}>
                    <M.FormControlLabel
                        control={<M.Checkbox color="secondary" name="saveCard" value="yes" />}
                        label="Remember credit card details for next time"
                    />
                </M.Grid>
            </M.Grid>
        </React.Fragment>
    );
}