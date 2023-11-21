import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import SectionTitle from '../../../components/SectionTitle';
import useMenu from '../../../Hooks/useMenu';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const axiosInstance = useAxiosSecure();

  const handleUpdate = (item) => {
    console.log(item);
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosInstance.delete(`/menu/${item._id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            //refetch to update the UI
            refetch();
            Swal.fire({
              title: `${item.name}has been deleted!`,
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-10/12 mx-auto mt-5 ">
      <SectionTitle
        subHeading={'---Hurry Up!---'}
        heading={'MANAGE ALL ITEMS'}
      ></SectionTitle>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold uppercase">
          Total Items : {menu.length}
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
              <th>SL</th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th className="text-center">Action</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="rounded-xl w-12 h-12">
                        <img src={item.image} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{item.name}</div>
                </td>
                <td>$ {item.price}</td>
                <th className="text-center">
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button className="text-orange-600 text-xl">
                      <FaEdit></FaEdit>
                    </button>
                  </Link>
                </th>
                <th className="text-center">
                  <button
                    onClick={() => handleDelete(item)}
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
export default ManageItems;
