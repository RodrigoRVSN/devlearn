import "./styles.scss";
import { api } from "../../services/api";

import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { TextField } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";

type ClassProps = {
  class_id: string[];
};

const EditClass = (class_id: ClassProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm();

  const onSubmit = (submitted: any) => {
    const token = localStorage.getItem("token");
    function editClass() {
      api
        .put(
          `/modules/${class_id.class_id}`,
          {
            module_id: submitted.module_id,
            name_class: submitted.name_class,
            dataClass: submitted.dataClass,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setIsEditing(!isEditing);
        })
        .catch((err) => {
          setError("Você precisa fazer login!");
        });
    }
    editClass();
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
          <form className="form-edit" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("module_id")}
              label="ID do módulo"
              type="name"
              variant="outlined"
              placeholder="React"
            />
            <TextField
              {...register("name_class")}
              label="Nome da aula"
              type="name"
              variant="outlined"
              placeholder="React"
            />
            <TextField
              {...register("dataClass")}
              type="Date"
              variant="outlined"
            />

            <p>{error}</p>
            <Button type="submit">EDITAR AULA</Button>
          </form>
        </>
      )}
    </>
  );
};

export default EditClass;
