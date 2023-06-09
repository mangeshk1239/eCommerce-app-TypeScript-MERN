import * as M from "@mui/material";
import * as React from "react";

export default function Quantity(): JSX.Element {

    const [count, setCount] = React.useState<number>(0);

    return (
        <div style={{ padding: "8% 0" }}>
            <M.Typography variant="body1" gutterBottom>Quantity</M.Typography>
            <div style={{ display: "flex", width: "50%" }}>
                <M.Button variant="text" onClick={(): void => setCount(count - 1)}>&mdash;</M.Button>
                <M.TextField
                    value={count}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                <M.Button variant="text" onClick={(): void => setCount(count + 1)}>&#xff0b;</M.Button>
            </div>
        </div>
    )
}