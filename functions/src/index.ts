import * as functions from "firebase-functions";
import Stripe from "stripe";
import * as cors from "cors";

// initialize CORS middleware to allow all origins
const corsHandler = cors({ origin: true });

// initialize Stripe
const stripe = new Stripe(functions.config().stripe.secret, {});

// export your HTTPS function
export const createPaymentIntent = functions.https.onRequest((req, res) => {
  // first run CORS, then your logic
  corsHandler(req, res, async () => {
    try {
      const { amount } = req.body;
      if (typeof amount !== "number") {
        res.status(400).send("Missing or invalid amount");
        return;
      }
      const pi = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });
      res.json({ client_secret: pi.client_secret });
    } catch (err: any) {
      console.error(err);
      res.status(500).send(err.message);
    }
  });
});
