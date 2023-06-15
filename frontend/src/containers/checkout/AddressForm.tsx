import * as React from 'react';
import * as M from "@mui/material";
import { ParentContext } from '../../App';
import { ACTION } from '../../App';

export default function AddressForm() {

    const fetchContext = React.useContext(ParentContext);
    const { state, dispatch } = fetchContext;

    return (
        <React.Fragment>
            <M.Typography variant="h6" gutterBottom>
                Shipping address
            </M.Typography>
            <M.Grid container spacing={3}>
                <M.Grid item xs={12} sm={6}>
                    <M.TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onChange={(e) => dispatch({ type: ACTION.CHECKOUT_ADDRESS.first_name, payload: e.target.value })}
                    />
                </M.Grid>
                <M.Grid item xs={12} sm={6}>
                    <M.TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        onChange={(e) => dispatch({ type: ACTION.CHECKOUT_ADDRESS.last_name, payload: e.target.value })}
                    />
                </M.Grid>
                <M.Grid item xs={12}>
                    <M.TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        onChange={(e) => dispatch({ type: ACTION.CHECKOUT_ADDRESS.first_address, payload: e.target.value })}
                    />
                </M.Grid>
                <M.Grid item xs={12}>
                    <M.TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                        onChange={(e) => dispatch({ type: ACTION.CHECKOUT_ADDRESS.last_address, payload: e.target.value })}
                    />
                </M.Grid>
                <M.Grid item xs={12} sm={6}>
                    <M.TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        onChange={(e) => dispatch({ type: ACTION.CHECKOUT_ADDRESS.city, payload: e.target.value })}
                    />
                </M.Grid>
                <M.Grid item xs={12} sm={6}>
                    <M.TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                        onChange={(e) => dispatch({ type: ACTION.CHECKOUT_ADDRESS.state, payload: e.target.value })}
                    />
                </M.Grid>
                <M.Grid item xs={12} sm={6}>
                    <M.TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        onChange={(e) => dispatch({ type: ACTION.CHECKOUT_ADDRESS.zip_code, payload: e.target.value })}
                    />
                </M.Grid>
                <M.Grid item xs={12} sm={6}>
                    <M.TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                        onChange={(e) => dispatch({ type: ACTION.CHECKOUT_ADDRESS.country, payload: e.target.value })}
                    />
                </M.Grid>
                <M.Grid item xs={12}>
                    <M.FormControlLabel
                        control={<M.Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </M.Grid>
            </M.Grid>
        </React.Fragment>
    );
}