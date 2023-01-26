 import { useState } from "react";
 export function DropDownButton({text,component}) {
    const [open, setOpen] = useState(false);

  function handleClick(){
   open ? setOpen(false) : setOpen(true)
  }
  return (
    <div className="flex mr-48 ml-48  ">
      <div className="bg-white border border-light-gray w-full  h-11 flex justify-center items-center relative">
        <div className="flex row ">
          <p className="text-lg text-center">
            <strong>{text}</strong>
          </p>

          <div className="relative">
          <div className="relative ">
            <button
              onClick={handleClick}
              className="hover:bg-light-gray mr-auto inline-block"
            >
              {!open  ? (
                <i className="fa-solid fa-angles-down absolute  bottom-1 left-3"></i>
              ) : (
                <i class="fa-solid fa-angles-up absolute  bottom-1 left-3"></i>
              )}
            </button>

</div>
            <div className="absolute top-10 -left-48  ">
              {open ? component  : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
