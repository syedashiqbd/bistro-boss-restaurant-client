import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCart from '../../../Hooks/useCart';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosInstance = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const navigate = useNavigate();

  useEffect(() => {
    if (totalPrice > 0) {
      axiosInstance
        .post('/create-payment-intent', { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosInstance, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      console.log('Payment error', error);
      setError(error.message);
    } else {
      console.log('Payment method', paymentMethod);
      setError('');
    }

    // confirm error
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous',
          },
        },
      });
    if (confirmError) {
      console.log('confirm error');
    } else {
      console.log('payment intent', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        console.log('Transaction Id:', paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(), //utc date convert by moment js
          cartIds: cart.map((item) => item._id),
          menuIds: cart.map((item) => item.menuId),
          status: 'pending',
        };

        const res = await axiosInstance.post('/payments', payment);
        console.log('payment saved', res.data);
        if (res.data?.paymentResult.insertedId) {
          Swal.fire({
            title: 'Payment Done!',
            text: 'Thanks for your payment',
            icon: 'success',
            timer: 1000,
          });
          refetch();
          navigate('/dashboard/paymentHistory');
        }
      }
    }
  };

  return (
    <div>
      <form
        className="border w-8/12 mx-auto p-10 rounded"
        onSubmit={handleSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          className="btn btn-primary px-10 mt-10"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-500 mt-5 font-semibold">
            Your Transaction ID: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};
export default CheckoutForm;
