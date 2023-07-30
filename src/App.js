import { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(-1);
  const [buttons, setButtons] = useState([]);
  const [pickedColor, setPickedColor] = useState();

  const buttonValueRef = useRef();

  const COLORS = {
    COLOR1: "ffce2f",
    COLOR2: "df9800",
    COLOR3: "ad0000",
    COLOR4: "885300",
    COLOR5: "008883",
    COLOR6: "001a9f",
    COLOR7: "29da00",
    COLOR8: "136700",
  };

  useEffect(() => {}, []);

  useEffect(() => {
    setPickedColor();
  }, [buttons]);

  function updateCount(numberToAdd) {
    setCount(count + numberToAdd);
  }

  function reset() {
    setCount(0);
  }

  function addButton() {
    if (!buttonValueRef?.current?.value) {
      return;
    }

    if (!pickedColor) {
      return;
    }

    let currentButtons = JSON.parse(JSON.stringify(buttons));
    currentButtons.push({
      value: parseInt(buttonValueRef.current.value),
      color: pickedColor,
    });
    buttonValueRef.current.value = "";
    setButtons(currentButtons);
  }

  function start() {
    if (buttons.length !== 0) {
      setCount(0);
      return;
    }
    alert("You need to create at least one button");
  }

  return (
    <div className="App">
      {count < 0 && (
        <div>
          <div className="ticketValueCreatorContainer">
            <div>Add ticket value</div>
            <input type="number" ref={buttonValueRef} />
            <div>Pick a color</div>
            <div className="colorPickerContainer">
              {Object.keys(COLORS).map((color, i) => {
                return (
                  <div
                    className={
                      pickedColor === color
                        ? `colorPickerColor color${color} selectedColor`
                        : `colorPickerColor color${color}`
                    }
                    onClick={() => {
                      setPickedColor(color);
                    }}
                    key={i}
                  ></div>
                );
              })}
            </div>
            <div className="addButton" onClick={addButton}>
              Add
            </div>
            <div>
              <div className="currentValuesContainer">
                <div>Current values</div>
                {buttons.map((button, index) => {
                  return (
                    <div key={index}>
                      {button.value}{" "}
                      <div
                        className={`createdButtonColor color${button.color}`}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="addButton" onClick={start}>
              Start
            </div>
          </div>
        </div>
      )}
      {count >= 0 && (
        <div>
          <div className="resetButton" onClick={reset}>
            Clear
          </div>
          <div className="runningCount">{count}</div>
          <div className="valueButtonContainer">
            {buttons.map((button, index) => {
              return (
                <div
                  className="valueButton"
                  onClick={() => {
                    updateCount(button.value);
                  }}
                  key={index}
                  style={{
                    border: `15px solid #${COLORS[button.color]}`,
                    color: `#${COLORS[button.color]}`,
                  }}
                >
                  {button.value}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
