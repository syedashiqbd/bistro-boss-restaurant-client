import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import SectionTitle from '../../../components/SectionTitle';

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosSecure();
  console.log(user.email);
  const { data: payment } = useQuery({
    queryKey: ['payment', user.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  console.log(payment);

  return (
    <div className="w-10/12 mx-auto mt-5 ">
      <SectionTitle
        subHeading={'---At a Glance!---'}
        heading={'payment history'}
      ></SectionTitle>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold uppercase">
          Total Payment : {payment?.length}
        </h2>
      </div>

      {/* Table */}
      <div
        className="overflow-x-auto mt-5
 rounded-t-lg"
      >
        <table className="table">
          {/* head */}
          <thead className="bg-primary text-white  ">
            <tr>
              <th>#</th>

              <th>Price</th>
              <th className="font-semibold">Transaction ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payment?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>$ {item.price}</td>
                <td className="font-semibold">{item.transactionId}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PaymentHistory;
