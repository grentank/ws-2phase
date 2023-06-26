import axios from 'axios';
import React, { createRef, useEffect, useRef, useState } from 'react';

export default function FormMessageCode() {
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [inputRefs, setInputRefs] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const submitCodeHandler = async () => {
    try {
      const response = await axios.post('/api/auth/sms', { code: code.join('') });
      if (response.status === 200) {
        setTimeout(() => {
          window.location.href = '/chat';
        }, 1000);
        modalRef.current.show();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e, index) => {
    setCode((prev) => prev.map((char, i) => (i === index ? e.target.value.slice(0, 1) : char)));
    if (e.target.value === '') return;
    if (code[index + 1] === '') {
      inputRefs[index + 1].current.focus();
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

  useEffect(() => {
    if (code.every((char) => char !== '')) {
      setLoading(true);
      const myModal = new bootstrap.Modal('#exampleModal', {
        keyboard: false,
      });
      myModal.show();
    }
  }, [code]);
  return (
    <>
      <form>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <h1 className="display-3">Введите код из смс</h1>
          <div className="input-group input-group-lg" style={{ width: '200px' }}>
            {code.map((char, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                className="form-control"
                value={code[index]}
                onChange={(e) => changeHandler(e, index)}
                disabled={loading}
              />
            ))}
          </div>
          <div className="spinner-border text-primary mt-3" role="status" hidden={!loading}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </form>
      <div
        ref={modalRef}
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
