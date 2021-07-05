import "./styles.scss";
import { api } from "../../services/api";

import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "./styles.scss";
import { useForm } from "react-hook-form";

type ModuleProps = {
  module_id: string[];
};

const EditModule = (module_id: ModuleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm();

  const onSubmit = (submitted: any) => {
    const token = localStorage.getItem("token");
    function postModules() {
      api
        .put(
          `/${module_id.module_id}`,
          { module: submitted.module },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setIsEditing(!isEditing);
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
        variant="contained"
        id="button-edit"
        color="primary"
        onClick={() => {
          setIsEditing(!isEditing);
        }}
      >
        {isEditing ? <CloseIcon /> : <EditIcon />}
      </Button>
      {isEditing && (
        <>
          <form className="form-edit toDown" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("module")}
              label="Nome do módulo"
              type="module"
              variant="outlined"
              placeholder="React"
            />

            <p>{error}</p>
            <Button type="submit">EDITAR MÓDULO</Button>
          </form>
        </>
      )}
    </>
  );
};

export default EditModule;
