import { useContext, useEffect, useRef, useState } from 'react';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link } from 'react-router-dom';

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const captchaRef = useRef(null);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (disabled) {
      console.log('Captcha not validated. Please validate the captcha.');
      return;
    }

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    login(email, password).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:w-1/2">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
                {/* <LoadCanvasTemplateNoReload /> */}
              </label>
              <input
                type="text"
                name="captcha"
                ref={captchaRef}
                placeholder="type the Captcha Above"
                className="input input-bordered"
                required
              />
              <button
                onClick={handleValidateCaptcha}
                className="btn btn-outline btn-xs mt-2 w-1/4 mx-auto"
              >
                Validate
              </button>
            </div>
            <div className="form-control mt-6 text-center">
              <input
                disabled={disabled}
                className="btn btn-primary mb-3"
                type="submit"
                value="Login"
              />
              <p>
                Don't have an account? Please{' '}
                <Link
                  className="hover:underline text-red-600 font-bold"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
