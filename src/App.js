import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';

import Input from './components/Form/Input/Input';

const initialData = {
  email: 'flank@gmail.com',
  address: {
    state: 'SP',
  },
};

function App() {
  const formRef = useRef(null);

  const handlesubmit = async (data, { reset }) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome e obrigatório'),
        email: Yup.string()
          .required('O e-mail e obrigatório')
          .email('Digite um email valido'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'Nó minimo 3 caracteres')
            .required('A cidade e obrigatória'),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);

      formRef.current.setErrors({});

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: 'Flank Silva',
        email: 'flank.silva.0@gmail.com',
        address: {
          city: 'Campinas',
        },
      });
    }, 2000);
  }, []);

  return (
    <Form ref={formRef} onSubmit={handlesubmit}>
      <Input name="name" />
      <Input type="email" name="email" />
      <Input type="password" name="password" />

      <Scope path="address">
        <Input name="street" />
        <Input name="number" />
        <Input name="state" />
        <Input name="city" />
      </Scope>

      <button type="submit">Enviar</button>
    </Form>
  );
}

export default App;
