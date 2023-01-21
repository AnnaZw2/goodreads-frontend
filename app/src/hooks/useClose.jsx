import { useEffect } from "react";
function useClose(buttonRef, callback) {

  useEffect(() => {
    let handler = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target) ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
}

export { useClose };
