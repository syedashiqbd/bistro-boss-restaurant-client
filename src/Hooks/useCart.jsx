import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
  const axiosInstance = useAxiosSecure();
  const { data: cart = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await axiosInstance.get('/carts');
      return res.data;
    },
  });

  return [cart];
};
export default useCart;
