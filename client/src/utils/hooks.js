import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [userValues, setUserValues] = useState(initialState);

  const onChange = (event) => {
    setUserValues({ ...userValues, [event.target.name]: event.target.value });
  };

  // const clearForm = () =>
  //   setUserValues({
  //     username: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   });

  const onSubmit = (event) => {
    event.preventDefault();
    // We don't need any client-side validation, because we already have server-side validation
    callback();
    // addUser();
    // clearForm();
  };

  return {
    onChange,
    onSubmit,
    userValues,
  };
};
