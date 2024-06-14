import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'
import { MessageContext } from "../store/messageStore";


const messageSwal = withReactContent(Swal)
function Message() {
  // const [message, setMessage] = useState({ type: '', title: '', text: '' })
  const [message] = useContext(MessageContext);

  useEffect(() => {
    if (message.title){
      messageSwal.fire({
        position: "top-end",
        icon: message.type,
        title: message.title,
        text: message.text,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }, [message]);

  return (
    <></>
  )
}

export default Message;