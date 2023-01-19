import { useEffect } from "react";

const useOutsideClick = (modalRef, buttonRef , callback) => {
  const handleClick = e => {
   
    if (modalRef.current
       && !modalRef.current.contains(e.target) 
       && e.target !== buttonRef.current ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [modalRef, buttonRef, handleClick]);
};

export default useOutsideClick;