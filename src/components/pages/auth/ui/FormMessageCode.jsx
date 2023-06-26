import React, { createRef, useEffect, useState } from 'react';

export default function FormMessageCode() {
  const [code, setCode] = useState(['', '', '', '']);
  const [inputRefs, setInputRefs] = useState([]);
  const changeHandler = (e, index) => {
    const firstEmptyIndex = code.findIndex((char) => char === '');
    setCode((prev) => prev.map((char, i) => (i === index ? e.target.value.slice(0, 1) : char)));
    if (e.target.value === '') {
      const prevIndex = index > 0 ? index - 1 : index;
      return inputRefs[prevIndex].current.focus();
    }
    if (firstEmptyIndex > -1 && index !== firstEmptyIndex) {
      return inputRefs[firstEmptyIndex].current.focus();
    }
    if (firstEmptyIndex < 3) {
      return inputRefs[firstEmptyIndex + 1].current.focus();
    }
  };
  useEffect(() => {
    setInputRefs((prev) =>
      Array(4)
        .fill()
        .map((_, i) => prev[i] || createRef()),
    );
  }, []);

  useEffect(() => {
    if (inputRefs[0]) inputRefs[0].current.focus();
  }, [inputRefs]);
  return (
    <form>
      <div className="input-group input-group-lg">
        <span className="input-group-text">First and last name</span>
        {code.map((char, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            className="form-control"
            value={code[index]}
            onChange={(e) => changeHandler(e, index)}
          />
        ))}
      </div>
    </form>
  );
}
