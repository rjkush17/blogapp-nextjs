import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast, Bounce  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleFav } from '@/lib/redux/slice/favSlice';


function Fav({ id }) {
  const data = useSelector((state) => state.fav.fav);
  const auth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

let bodyData
if(auth){
  bodyData = {userID : auth.details.user._id, blogID : id}
}

  const notify = () =>
    toast.error("Login first to add", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  if (!auth) {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}

        />
        <button onClick={notify}>
          <FaRegHeart className="text-3xl  text-zinc-400" />
        </button>
      </>
    );
  }
  if (data && data.includes(id)) {
    return (
      <button onClick={()=>dispatch(toggleFav(bodyData))}>
        <FaHeart className="text-3xl text-red-600" />
      </button>
    );
  }else{
    return (
      <button onClick={()=>dispatch(toggleFav(bodyData))}>
        <FaRegHeart className="text-3xl" />
      </button>
    );
  }

 
}

export default Fav;
