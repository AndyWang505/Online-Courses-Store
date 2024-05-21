import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL, process.env.REACT_APP_API_PATH);
    (async() => {
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`)
      console.log(res);
    })();
  }, [])

  return (
    <></>
  );
}

export default App;
