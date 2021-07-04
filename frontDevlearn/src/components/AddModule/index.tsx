import { useState } from "react";
import { Button } from "../Button";
import { TextField } from "@material-ui/core";
import "./styles.scss";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";

export function AddModule(): JSX.Element {
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm();

  const onSubmit = (submitted: any) => {
    const token = localStorage.getItem("token");
    function postModules() {
      api
        .post(
          `/modules`,
          { module: submitted.module },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          setClicked(!clicked);
        })
        .catch((err) => {
          setError("Você precisa fazer login!");
        });
    }
    postModules();
  };

  return (
    <>
      <Button
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        {clicked ? "Fechar" : "Adicionar módulo"}
      </Button>

      {clicked && (
        <>
          <form className="form-add" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("module")}
              label="Nome do módulo"
              type="module"
              variant="outlined"
              placeholder="React"
            />

            <p>{error}</p>
            <Button type="submit">ADICIONAR MÓDULO</Button>
          </form>
        </>
      )}
    </>
  );
}
