import "./styles.scss";
import { api } from "../../services/api";

import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

import { Button } from "@material-ui/core";

type ModuleProps = {
  module_id: string[];
};

const DeleteModule = (module_id: ModuleProps) => {
  function handleClick() {
    const token = localStorage.getItem("token");
    function postModules() {
      api.delete(`/${module_id.module_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    postModules();
  }

  return (
    <>
      <Button
        variant="contained"
        id="button-delete"
        color="secondary"
        onClick={handleClick}
      >
        <DeleteOutlinedIcon />
      </Button>
    </>
  );
};

export default DeleteModule;
