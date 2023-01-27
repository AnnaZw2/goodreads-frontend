import { useState, useRef } from "react";
import { useClose } from "../../hooks/useClose";
import { AddClicked } from "./AddClicked";

export function AddButton({ background, background_btn }) {
  const [clicked, setClicked] = useState(false);

  const buttonRef = useRef();
  useClose(buttonRef, () => {
    setClicked(false);
  });

  return (
    <div>
      {!clicked ? (
        <button
          className={`btn-width ${background} text-green hover `}
          onClick={() => {
            setClicked(true);
          }}
        >
          Add
        </button>
      ) : (
        <div ref={buttonRef}>
          <AddClicked
            setClicked={setClicked}
            background={background}
            background_btn={background_btn}
          />
        </div>
      )}
    </div>
  );
}
