import { Outlet, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function Dashboard() {
  const navigate = useNavigate();
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
    <>
      <nav className='bg-gray-800'>
        <div className='container mx-auto flex justify-between items-center p-4'>
          <h1 className='text-white text-xl mb-0'>後台管理系統</h1>
          <button
            className='text-white'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div
            className='collapse navbar-collapse justify-end'
            id='navbarNav'
          >
            <ul className='flex space-x-4'>
              <li>
                <button
                  type='button'
                  className='btn btn-sm btn-light bg-white text-gray-800 px-4 py-2 rounded-md'
                  onClick={logout}
                >
                  登出
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='flex' style={{ minHeight: 'calc(100vh - 76px)' }}>
        <div className='bg-gray-100 w-48'>
          <ul className='list-none p-0'>
            <li>
              <Link
                className='block py-3 px-4 hover:bg-gray-200'
                to='/admin/products'
              >
                <i className='bi bi-cup-fill mr-2' />
                產品列表
              </Link>
            </li>
            <li>
              <Link
                className='block py-3 px-4 hover:bg-gray-200'
                to='/admin/coupons'
              >
                <i className='bi bi-ticket-perforated-fill mr-2' />
                優惠卷列表
              </Link>
            </li>
            <li>
              <Link
                className='block py-3 px-4 hover:bg-gray-200'
                to='/admin/orders'
              >
                <i className='bi bi-receipt mr-2' />
                訂單列表
              </Link>
            </li>
          </ul>
        </div>
        <div className='flex-1'>
          {token && <Outlet />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;