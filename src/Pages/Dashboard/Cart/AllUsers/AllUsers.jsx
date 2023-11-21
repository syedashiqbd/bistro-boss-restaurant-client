import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../../../components/SectionTitle';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const axiosInstance = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosInstance.get('/users');
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    console.log(user._id);
    axiosInstance.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

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
        axiosInstance.delete(`/users/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: 'Deleted!',
              text: 'User has been deleted.',
              icon: 'success',
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="w-10/12 mx-auto ">
      <SectionTitle
        subHeading={'---How many---'}
        heading={'manage all users'}
      ></SectionTitle>

      <h2 className="text-3xl font-semibold uppercase">
        Total Users : {users.length}
      </h2>

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
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>

                <td>
                  <div>{user.name}</div>
                </td>
                <td>
                  <div className="font-bold">{user.email}</div>
                </td>

                <td className="text-center">
                  {user?.role === 'admin' ? (
                    'Admin'
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="text-orange-600 text-2xl"
                    >
                      <FaUsers></FaUsers>
                    </button>
                  )}
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-orange-600 text-xl"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AllUsers;
