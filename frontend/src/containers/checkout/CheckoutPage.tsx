import * as React from 'react';
import * as M from "@mui/material";
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Copyright from "../../components/Copyright";
import { ParentContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import StripeCheckout from 'react-stripe-checkout';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const defaultTheme = M.createTheme();

export default function CheckoutPage() {

  const navigate = useNavigate();
  const access_token: string | undefined = getCookie("access_token");

  const { data, error } = useQuery<AxiosResponse, Error>({
    queryKey: ['getCheckoutPageData'],
    queryFn: getPageData,
    cacheTime: 0,
    retry: false
  });

  const fetchContext = React.useContext(ParentContext);
  const { state } = fetchContext;

  if (state.CART.length === 0) return navigate("/cart");

  const [activeStep, setActiveStep] = React.useState<number>(0);

  const handleNext = () => {

    const checkEmptyValue = Object.values(state.CHECKOUT_ADDRESS).includes("");

    if (checkEmptyValue) {
      alert("Please fill in all the details");
    } else {
      setActiveStep(activeStep + 1);
    }

  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  isAuthenticated(error);

  let total: number | undefined;
  if (state) {
    total = state.CART.map((ele: ICartItem) => ele.product_price * ele.product_quantity).reduce((a: number, b: number) => a + b, 0);
  }

  return (
    <M.ThemeProvider theme={defaultTheme}>
      <M.CssBaseline />
      <M.Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <M.Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <M.Typography component="h1" variant="h4" align="center">
            Checkout
          </M.Typography>
          <M.Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <M.Step key={label}>
                <M.StepLabel>{label}</M.StepLabel>
              </M.Step>
            ))}
          </M.Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <M.Typography variant="h5" gutterBottom>
                Thank you for your order.
              </M.Typography>
              <M.Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </M.Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <M.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <M.Button variant="contained" onClick={() => navigate("/cart")} color="error" sx={{ mt: 3, ml: 1 }} >Go to Cart Page</M.Button>
                {activeStep !== 0 && (
                  <M.Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </M.Button>
                )}
                {
                  activeStep === 2 ? (
                    <M.Button
                      variant="contained"
                      // onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      <StripeCheckout
                        name="Stripe Checkout"
                        image="https://images.ctfassets.net/fzn2n1nzq965/HTTOloNPhisV9P4hlMPNA/cacf1bb88b9fc492dfad34378d844280/Stripe_icon_-_square.svg?q=80&w=1082"
                        ComponentClass="div"
                        panelLabel={`PAY`}
                        amount={total as number * 100}
                        currency="USD"
                        stripeKey={data.stripe_key}
                        email={data.email}
                        token={onToken}
                      />
                    </M.Button>

                  ) : (
                    <M.Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </M.Button>
                  )
                }
              </M.Box>
            </React.Fragment>
          )}
        </M.Paper>
        <Copyright />
      </M.Container>
    </M.ThemeProvider>
  );

  async function getPageData(): Promise<AxiosResponse> {
    return await axios.get("/api/account/checkout", {
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

  function onToken(token) {
    console.log("OK", token);
  }

}