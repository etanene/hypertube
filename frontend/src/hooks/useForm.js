import { useState } from 'react';

import { apiService } from '../services';

const useForm = (formSchema, submit) => {
  const [state, setState] = useState(formSchema);

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

  const handleChange = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        error: formSchema[name].validate(value, prevState),
        message: formSchema[name].message,
        value,
        name,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = Object.values(state).reduce((obj, current) => {
      let mergeObj = {};

      mergeObj = { [current.name]: current.value };

      return (Object.assign(obj, mergeObj));
    }, {});

    console.log('data', data);

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
    handleChange,
    handleSubmit,
    fetchUser,
  };
};

export default useForm;
