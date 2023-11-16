import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                {...register('name', { required: true })}
                placeholder="Enter your name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                placeholder="Enter your email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                {...register('password', {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
                placeholder="Enter your password"
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-red-600">Password is required</span>
              )}
            </div>

            <div className="form-control mt-6 text-center">
              <input
                className="btn btn-primary mb-3"
                type="submit"
                value="Sign Up"
              />
              <p>
                Already have an account? Please{' '}
                <Link
                  className="hover:underline text-red-600 font-bold"
                  to="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
