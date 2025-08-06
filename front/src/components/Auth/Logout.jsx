import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/apiconfig';
import { useDispatch } from 'react-redux';
import { logout  } from '../../store/authSlicer'; // update path as per your structure

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      try {

        await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
        sessionStorage.removeItem("token");
        dispatch(logout());
        navigate('/');
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    handleLogout();
  }, [dispatch, navigate]);

  return null; 
}

export default Logout;