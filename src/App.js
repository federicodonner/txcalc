import { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(-1);
  const [buttons, setButtons] = useState([{ value: 100, color: "COLOR1" }]);
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

  // Whenever a new button is created, the color picker is reset
  // and the value text is reset
  useEffect(() => {
    buttonValueRef.current.value = "";
    setPickedColor();
  }, [buttons]);

  // Function called when a new button is added
  function addButton() {
    // If the text field doesn't have a value, exit
    if (!buttonValueRef?.current?.value) {
      return;
    }

    // If no color is picked, exit
    if (!pickedColor) {
      return;
    }

    // Insert the new butotn's info in the button's array
    let currentButtons = JSON.parse(JSON.stringify(buttons));
    currentButtons.push({
      value: parseInt(buttonValueRef.current.value),
      color: pickedColor,
    });
    setButtons(currentButtons);
  }

  // Update count adding the value of the pressed button
  function updateCount(numberToAdd) {
    setCount(count + numberToAdd);
  }

  // Reset ticket count
  function reset() {
    setCount(0);
  }

  // Start the calculator
  function start() {
    if (buttons.length !== 0) {
      setCount(0);
      return;
    }
    // If there aren't buttons display the alert
    alert("You need to create at least one button");
  }

  return (
    <div className="App">
      {count < 0 && (
        <div className="ticketValueCreatorContainer">
          <div className="ticketValueContainer">
            <div>Add ticket value</div>
            <input type="number" ref={buttonValueRef} />
          </div>
          <div className="ticketColorContainer">
            <div>Pick a color</div>
            <div className="colorPickerContainer">
              {Object.keys(COLORS).map((color, i) => {
                return (
                  <div
                    className={
                      pickedColor === color
                        ? `colorPickerColor selectedColor`
                        : `colorPickerColor`
                    }
                    style={{
                      backgroundColor: `#${COLORS[color]}`,
                    }}
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
          </div>
          <div className="currentValuesContainer">
            <div>Current values</div>
            <div className="currentValuesLabelsContainer">
              {buttons.map((button, index) => {
                return (
                  <div key={index}>
                    {button.value}{" "}
                    <div
                      className={`createdButtonColor`}
                      style={{
                        backgroundColor: `#${COLORS[button.color]}`,
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="addButtonContainer">
            <div className="addButton" onClick={start}>
              Start
            </div>
          </div>
        </div>
      )}
      {count >= 0 && (
        <>
          <div className="resetButtonContainer">
            <div className="resetButton" onClick={reset}>
              Clear
            </div>
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
        </>
      )}
    </div>
  );
}
