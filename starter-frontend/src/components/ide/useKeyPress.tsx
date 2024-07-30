// Source (JS): https://github.com/manuarora700/react-code-editor/blob/main/src/hooks/useKeyPress.js

import React, { Key, useState } from "react";

const useKeyPress = function (targetKey: KeyboardEvent) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler(key: KeyboardEvent) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = (key: KeyboardEvent) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", downHandler);
    document.addEventListener("keyup", upHandler);

    return () => {
      document.removeEventListener("keydown", downHandler);
      document.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};

export default useKeyPress;
