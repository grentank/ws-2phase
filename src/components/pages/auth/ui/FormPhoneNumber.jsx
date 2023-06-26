import React, { useState } from 'react';
import formatInput from '../utils/formatInput';

export default function FormPhoneNumber({ submitHandler }) {
  const [input, setInput] = useState({
    value: '',
    formatted: '',
    phoneString: '',
  });
  const changeHandler = (event) => {
    const formatted = formatInput(event.target.value);
    setInput({
      value: event.target.value,
      formatted,
      phoneString: formatted.replace(/[^0-9]/g, ''),
    });
  };
  return (
    <form onSubmit={(event) => submitHandler(event, input)}>
      <div className="input-group input-group-lg">
        <span className="input-group-text" id="inputGroup-sizing-lg">
          +7
        </span>
        <div className="form-floating">
          <input
            value={input.formatted}
            onChange={changeHandler}
            id="floatingInput"
            type="text"
            className="form-control"
            placeholder="(987) 654-32-10"
            aria-label="Phone number"
            aria-describedby="inputGroup-sizing-lg"
          />
          <label htmlFor="floatingInput">Номер телефона</label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
