import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [ data, setData ] = useState({
    username: '',
    password: ''
  });
  const [ loginState, setLoginState ] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]:value });
  }

  const submit = async (e) => {
    try {
      const res = await axios.post('/v2/admin/signin', data);
      const { token, expired } = res.data;
      console.log(res.data);
      document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
      if(res.data.success){
        navigate('/admin/products');
      }
    } catch (error) {
      setLoginState(error.response.data);
    }
  }
  
  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">登入帳號</h2>
  
          <div className={`alert alert-danger ${loginState.message ? 'block' : 'hidden'}`} role="alert">
            {loginState.message}
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="username"
              type="email"
              placeholder="name@example.com"
              onChange={handleChange}
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              密碼
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
            />
          </div>
  
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={submit}
          >
            登入
          </button>
        </div>
      </div>
    </div>
  );  
}
export default Login;