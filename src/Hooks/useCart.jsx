import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const useCart = () => {
  const axiosInstance = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });

  return [cart, refetch];
};
export default useCart;
