import { FaUtensils } from 'react-icons/fa';
import SectionTitle from '../../../components/SectionTitle';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { name, category, price, recipe, _id } = useLoaderData();

  const { register, handleSubmit, reset } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosInstance = useAxiosSecure();

  const onSubmit = async (data) => {
    //image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosInstance.patch(`/menu/${_id}`, menuItem);
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount > 0) {
        // show popup
        // reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${data.name} updated successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log('with image url', res);
  };

  return (
    <div>
      <SectionTitle
        subHeading={'---Refresh Info---'}
        heading={'update an item'}
      ></SectionTitle>

      <div className="card shrink-0 w-full lg:w-9/12 mx-auto shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe name*</span>
            </label>
            <input
              {...register('name', { required: true })}
              defaultValue={name}
              type="text"
              placeholder="Recipe name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="flex gap-4 justify-between w-full">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue={category}
                {...register('category', { required: true })}
                className="select select-bordered w-full border-base-300 text-slate-500"
              >
                <option disabled value="">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="dessert">Dessert</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="drinks">Drink</option>
              </select>
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                {...register('price', { required: true })}
                defaultValue={price}
                type="text"
                placeholder="Price"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Detail*</span>
            </label>
            <textarea
              {...register('recipe')}
              defaultValue={recipe}
              placeholder="Recipe Details"
              className="textarea textarea-bordered textarea-md w-full "
            ></textarea>
          </div>
          <div className="mt-2">
            <input
              {...register('image', { required: true })}
              type="file"
              className="file-input file-input-bordered file-input-md w-full max-w-xs"
            />
          </div>

          <div className="form-control mt-4 max-w-max ">
            <button className="btn btn-primary ">
              Update Item
              <FaUtensils></FaUtensils>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateItem;
