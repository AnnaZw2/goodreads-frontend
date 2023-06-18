import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const useHash = (targetPath) => {
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
      const hash = location.hash;
      const stateParam = 'state=';
  
      if (location.pathname === targetPath || hash.includes(stateParam)) {
        navigate(targetPath);
      }
    }, [location.pathname, location.hash, navigate, targetPath]);
  };
  
  export {useHash};