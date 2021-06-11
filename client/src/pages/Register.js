import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { REGISTER_USER } from "../utils/graphql";
import { useForm } from "../utils/hooks";
import styles from "./form.module.scss";

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { onChange, onSubmit, userValues } = useForm(
    registerUser,
    initialState
  );

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      console.log(userData);
      context.login(userData); // We don't need a new function for register, because when we register we want our user to log in
      // When we successfully register a user, props.history.push("/") sends us back to the homepage
      props.history.push("/");
    },
    onError(err) {
      // This follows the way we set our errors on our server code
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: userValues,
  });

  // We have to declare this function like this, so we can pass it instead of addUser as argument. If we don't use this, it doesn't work. The reason why it works, is because of hoisting: at the beginning of the program all the functions with a function keyword in front of them are hoisted, that is, brought up and read through, so even if it's declared down here it's recognized up there (unlike the functions assigned to variables)
  function registerUser() {
    addUser();
  }

  return (
    <div className={styles.formContainer}>
      <Form onSubmit={onSubmit} naValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          className={styles.required}
          label="Nome&nbsp;do&nbsp;usuário"
          placeholder="Como iremos te chamar?"
          name="username"
          type="text"
          value={userValues.username}
          // TODO: What if we had more than 2 errors associated with username? Is there a better way to handle this?
          error={
            errors.username
              ? {
                  content:
                    errors.username === "This username is taken"
                      ? "Já temos um usuário com este nome, escolha outro por favor"
                      : "Por favor, insira o nome do usuário",
                  pointing: "below",
                }
              : false
          }
          onChange={onChange}
        />
        <Form.Input
          className={styles.required}
          label="Email"
          placeholder="Seu melhor email"
          name="email"
          type="email"
          value={userValues.email}
          error={
            errors.email
              ? {
                  content: "Por favor, insira um email válido",
                  pointing: "below",
                }
              : false
          }
          onChange={onChange}
        />
        <Form.Input
          className={styles.required}
          label="Senha"
          placeholder="Senha forte e única, de preferência"
          name="password"
          type="password"
          value={userValues.password}
          error={
            errors.password
              ? {
                  content: "Por favor, insira uma senha válida",
                  pointing: "below",
                }
              : false
          }
          onChange={onChange}
        />
        <Form.Input
          className={styles.required}
          label="Confirmar&nbsp;senha"
          placeholder="Confirme sua senha"
          name="confirmPassword"
          type="password"
          value={userValues.confirmPassword}
          error={
            errors.confirmPassword
              ? {
                  content: "As senhas devem ser idênticas",
                }
              : false
          }
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {/* {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}

export default Register;
