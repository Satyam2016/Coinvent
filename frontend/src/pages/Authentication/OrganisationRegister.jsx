import React, { useState } from 'react';
import { useFormik } from 'formik';

const LoginSignupComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const formik = useFormik({
    initialValues: {
      organisation_name: '',
      name:'',
      email:'',
      password: ''
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3000/organisationregister', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        console.log('successfully Registered');
        window.location.href = '/organise';

      } catch (error) {
        console.error('Error:', error);
        alert('There was an error in registration. Please try again.');
      }
    },    
  });
  
  return (
    <div className='h-screen w-full flex items-center justify-center dark:bg-white bg-black dark:bg-grid-black/[0.2] bg-grid-white/[0.2]'>
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-white bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)] "></div>

    <div className="w-3/5 py-8 flex justify-center items-center bg-gray-300 rounded-2xl shadow-black shadow-xl">
      <div className="w-3/4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-center">
            {isLogin ? 'Login' : 'Sign Up'}
          </h1>
        </div>
        <form onSubmit={formik.handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="organisation_name">
              Organisation Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="organisation_name"
              name="organisation_name"
              type="text"
              value={formik.values.organisation_name}
              onChange={formik.handleChange}
              placeholder="Organisation Name"
              required={!isLogin} // Only required for signup
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Email Address"
                required
              />
            </div>
          )}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="********"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className="text-blue-500 hover:underline ml-1"
            onClick={toggleForm}
          >
            {isLogin ? 'Sign up here' : 'Log in here'}
          </button>
        </p>
      </div>
    </div>
    </div>
  );
};

export default LoginSignupComponent;
