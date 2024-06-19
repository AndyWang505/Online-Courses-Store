import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useReducer } from 'react';
import Message from '../../components/Message';
import { MessageContext, messageReducer, initState } from '../../store/messageStore';

function Dashboard() {
  const navigate = useNavigate();
  const reducer = useReducer(messageReducer, initState);
  const logout = () => {
    document.cookie = 'hexToken=;';
    navigate('/login');
  }

  // get cookie method
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];
  axios.defaults.headers.common['Authorization'] = token;
  useEffect(() => {  
    if(!token) {
      return navigate('/login');
    }
    (async() => {
      try {
        await axios.post('/v2/api/user/check');
      } catch (error) {
        if(error.response.data.success){
          navigate('/');
        }
      }
    })();
  }, [navigate, token]);

  return (
    <MessageContext.Provider value={reducer}>
      <Message />
      <nav className='bg-gray-800'>
        <div className='container mx-auto flex justify-between items-center p-4'>
          <h1 className='text-white text-xl font-bold mb-0'>後台管理系統</h1>
          <ul className='flex space-x-4'>
            <li>
              <button
                type='button'
                className='bg-white text-gray-800 px-4 py-2 rounded-md hover:text-gray-700 hover:bg-gray-50'
                onClick={logout}
              >
                登出
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className='flex' style={{ minHeight: 'calc(100vh - 76px)' }}>
        <div className='bg-gray-100 w-48'>
          <ul className='list-none p-0'>
            <li>
              <NavLink
                className='block py-3 px-4 hover:bg-gray-200'
                to='/admin/products'
              >
                <i className='bi bi-cup-fill mr-2' />
                產品列表
              </NavLink>
            </li>
            <li>
              <NavLink
                className='block py-3 px-4 hover:bg-gray-200'
                to='/admin/coupons'
              >
                <i className='bi bi-ticket-perforated-fill mr-2' />
                優惠卷列表
              </NavLink>
            </li>
            <li>
              <NavLink
                className='block py-3 px-4 hover:bg-gray-200'
                to='/admin/orders'
              >
                <i className='bi bi-receipt mr-2' />
                訂單列表
              </NavLink >
            </li>
          </ul>
        </div>
        <div className='flex-1'>
          {token && <Outlet />}
        </div>
      </div>
    </MessageContext.Provider>
  );
};

export default Dashboard;