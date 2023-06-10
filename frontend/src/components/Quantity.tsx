import * as M from "@mui/material";
import * as React from "react";

interface IProps {
    quantity: number,
    setQuantity: React.Dispatch<React.SetStateAction<number>>,
}

export default function Quantity({ quantity, setQuantity }: IProps): JSX.Element {

    return (
        <div style={{ padding: "8% 0" }}>
            <M.Typography color={"white"} variant="body1" gutterBottom>Quantity</M.Typography>
            <div style={{ display: "flex", width: "50%", border: "1px solid white" }}>
                <M.Button variant="text" onClick={(): void => setQuantity(quantity - 1)}>&mdash;</M.Button>
                <M.TextField value={quantity} InputProps={{ readOnly: true, }} variant="filled" />
                <M.Button variant="text" onClick={(): void => setQuantity(quantity + 1)}>&#xff0b;</M.Button>
            </div>
        </div>
    )
}