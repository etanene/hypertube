/* eslint-disable */

import { useState, useCallback } from 'react';
import { apiService } from '../services';

const useForm = (formSchema, submit, userId = null) => {
  const [state, setState] = useState(formSchema);

  const validateForm = () => {
    const names = Object.keys(state);
    let result = true;
    for (let i = 0; i < names.length; i += 1) {
      if (state[names[i]].error || (!state[names[i]].value && state[names[i]].required)) {
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
        value,
        name,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = Object.values(state).reduce((obj, current) => {
      let mergeObj = {};
      if (current.name) mergeObj = { [current.name]: current.value };
      return (Object.assign(obj, mergeObj));
    }, {});
    if (validateForm() && Object.getOwnPropertyNames(data).length > 0) {
      try {
        submit(data);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const fetchUser = useCallback(async (params) => {
    if (params.error || !params.value) {
      return;
    }
    try {
      const data = await apiService.get(`/api/user/get?${params.field}=${params.value}`);
      if (Boolean(data.length) === params.exists && data[0] && data[0].user_id !== userId) {
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
  }, []);

  return {
    state,
    handleChange,
    handleSubmit,
    fetchUser,
  };
};

export default useForm;
