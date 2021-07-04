import { api } from "../../services/api";
import { Paper, TextField } from "@material-ui/core";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";

import "./styles.scss";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export function Login(): JSX.Element {
  const { handleSubmit, register } = useForm();
  const history = useHistory();
  const [error, setError] = useState("");

  const onSubmit = (submitted: any) => {
    function getItems() {
      api
        .post(`/login`, {
          email: submitted.email,
          password: submitted.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data);
          history.push("/admin");
        })
        .catch((err) => {
          setError("Login está incorreto!");
        });
    }
    getItems();
  };

  return (
    <>
      <div id="register-page">
        <Paper elevation={10} className="box-container">
          <h2>DEV LEARN</h2>
          <h1>Faça seu login!</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              required
              {...register("email")}
              label="Email"
              type="email"
              variant="outlined"
              placeholder="rodrigovictor81@gmail.com"
            />
            <TextField
              required
              {...register("password")}
              label="Senha"
              type="password"
              variant="outlined"
              placeholder="*******"
            />
            <p>{error}</p>
            <Button type="submit">ENTRAR</Button>
          </form>

          <h3>
            Não tem conta? <a href="/register">Cadastre-se</a>
          </h3>
        </Paper>
      </div>
    </>
  );
}
