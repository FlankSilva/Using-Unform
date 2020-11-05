import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

function Input({ name, ...props }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <>
        <input ref={inputRef} defaultValue={defaultValue} {...props} />
        {error && <span style={{ color: '#f00' }}>{error}</span>}
      </>
    </Container>
  );
}

export default Input;
