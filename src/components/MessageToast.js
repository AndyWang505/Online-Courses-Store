import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages } from "../slice/messageSlice";
import { useLocation } from "react-router-dom";
// sweetalert
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

const messageSwal = withReactContent(Swal)

function MessageToast() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message)
  const location = useLocation();

  // ensure messages cleared
  useEffect(() => {
    dispatch(clearMessages());
  }, [location, dispatch]);

  useEffect(() => {
    // console.log(messages);
    
    if (messages.length > 0){
      messages.forEach(item => {
        messageSwal.fire({
          position: "top-end",
          icon: item.type,
          title: item.title,
          text: item.text,
          showConfirmButton: false,
          timer: 1500
        });
      });
      dispatch(clearMessages());
    }
  }, [messages, dispatch]);

  return (
    <></>
  )
}

export default MessageToast;