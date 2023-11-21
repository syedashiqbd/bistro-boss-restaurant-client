import { loadStripe } from '@stripe/stripe-js';
import SectionTitle from '../../../components/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripPromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);


const Payment = () => {
  return (
    <div>
      <SectionTitle
        subHeading={'---Please pay to eat---'}
        heading={'make payment'}
      ></SectionTitle>
      <div>
        <Elements stripe={stripPromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};
export default Payment;
