import { FaTrashAlt } from 'react-icons/fa';
import useCart from '../../../Hooks/useCart';
import SectionTitle from '../../../components/SectionTitle';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const axiosInstance = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/carts/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Item has been deleted.',
              icon: 'success',
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="w-10/12 mx-auto mt-5 ">
      <SectionTitle
        subHeading={'---My Cart---'}
        heading={'wanna add more?'}
      ></SectionTitle>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold uppercase">
          Total Orders : {cart.length}
        </h2>
        <h2 className="text-3xl font-semibold uppercase">
          Total Price: $ {totalPrice}
        </h2>
        {cart?.length ? (
          <Link to="/dashboard/payment">
            <button className="btn btn-primary px-6 text-xl">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary px-6 text-xl">
            Pay
          </button>
        )}
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
              <th>SL</th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="rounded-xl w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{item.name}</div>
                </td>
                <td>$ {item.price}</td>
                <th className="text-center">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-orange-600 text-xl"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Cart;
