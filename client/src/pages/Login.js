import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { LOGIN_USER } from "../utils/graphql";
import { useForm } from "../utils/hooks";
import styles from "./form.module.css";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    password: "",
  };

  const { onChange, onSubmit, userValues } = useForm(
    loginUserCallback,
    initialState
  );

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      console.log(userData);
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: userValues,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className={styles.formContainer}>
      <Form onSubmit={onSubmit} naValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          className={styles.required}
          label="Nome&nbsp;do&nbsp;usuário"
          placeholder="Seu nome de usuário"
          name="username"
          type="text"
          value={userValues.username}
          error={
            errors.username
              ? {
                  content: "Por favor, insira o nome do usuário",
                  pointing: "below",
                }
              : false
          }
          onChange={onChange}
        />
        <Form.Input
          className={styles.required}
          label="Senha"
          placeholder="Sua senha"
          name="password"
          type="password"
          value={userValues.password}
          error={
            errors.password
              ? {
                  content: "Por favor, insira uma senha válida",
                }
              : false
          }
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {errors.general === "Wrong user or password" && (
        <div className="ui error message">
          <ul className="list">
            <li>{`Nome do usuário ou senha incorretas`}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Login;
