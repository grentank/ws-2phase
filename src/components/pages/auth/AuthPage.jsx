import React, { useState } from 'react';
import FormPhoneNumber from './ui/FormPhoneNumber';
import FormMessageCode from './ui/FormMessageCode';

export default function AuthPage() {
  const [showForm, setShowForm] = useState(true);

  const submitHandler = (event, input) => {
    event.preventDefault();
    console.log(input);
    setShowForm(false);
  };

  return (
    <div className="row">
      {showForm ? <FormPhoneNumber submitHandler={submitHandler} /> : <FormMessageCode />}
    </div>
  );
}
