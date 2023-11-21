import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/admin/${user.email}`);
      // console.log(res.data);
      return res.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};
export default useAdmin;
