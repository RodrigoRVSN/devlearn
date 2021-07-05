import { api } from "../../services/api";
import { Paper, TextField } from "@material-ui/core";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";

import "./styles.scss";
import { useHistory } from "react-router-dom";

export function Register(): JSX.Element {
  const { handleSubmit, register } = useForm();
  const history = useHistory();

  const onSubmit = (submitted: any) => {
    function getItems() {
      api.post(`/users`, {
        email: submitted.email,
        password: submitted.password,
      });
    }
    getItems();
    history.push("/login");
  };

  return (
    <>
      <div id="register-page">
        <Paper elevation={10} className="box-container toLeft">
          <h2>DEV LEARN</h2>
          <h1>Faça seu cadastro!</h1>

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
            <Button type="submit">CADASTRAR</Button>
          </form>

          <h3>
            Já tem conta? <a href="/login">Faça login</a>
          </h3>
        </Paper>
      </div>
    </>
  );
}
