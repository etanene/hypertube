import { useState } from 'react';

import { apiService } from '../services';

const useForm = (formSchema, submit) => {
  const [state, setState] = useState(formSchema);

  const validateField = (name, value) => {
    if (name === 'confirm_password') {
      return (value !== state.password.value);
    }
    return ((formSchema[name].regex && !formSchema[name].regex.test(value)) || value === '');
  };

  const validateForm = () => {
    const names = Object.keys(state);
    let result = true;

    for (let i = 0; i < names.length; i += 1) {
      if (state[names[i]].error || !state[names[i]].value) {
        result = false;
        setState((prevState) => ({
          ...prevState,
          [names[i]]: {
            ...prevState[names[i]],
            error: true,
          },
        }));
      }
    }
    return (result);
  };

  const handleChange = (event) => {
    event.persist();

    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        error: validateField(name, value),
        message: formSchema[name].message,
        value,
      },
    }));
  };

  const handleChangeFile = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        error: validateField(name, value),
        message: formSchema[name].message,
        value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = Object.values(event.target).reduce((obj, current) => {
      let mergeObj = {};

      if (current.nodeName === 'INPUT' && current.name !== 'photo') {
        mergeObj = { [current.name]: current.value };
      }
      if (current.nodeName === 'INPUT' && current.name === 'photo') {
        mergeObj = { [current.name]: current.src };
      }
      return (Object.assign(obj, mergeObj));
    }, {});

    if (validateForm()) {
      try {
        submit(data);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const fetchUser = async (params) => {
    if (params.error || !params.value) {
      return;
    }
    try {
      const data = await apiService.get(`/api/user/get?${params.field}=${params.value}`);

      if (Boolean(data.length) === params.exists) {
        setState((prevState) => ({
          ...prevState,
          [params.name]: {
            ...prevState[params.name],
            error: true,
            message: params.message,
          },
        }));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return {
    state,
    handleChangeFile,
    handleChange,
    handleSubmit,
    fetchUser,
  };
};

export default useForm;
