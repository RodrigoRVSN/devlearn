import "./styles.scss";
import { api } from "../../services/api";

import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

type ModuleProps = {
  module_id: string[];
};

const EditModule = (module_id: ModuleProps) => {
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
        id="button-edit"
        color="primary"
        onClick={handleClick}
      >
        <EditIcon />
      </Button>
    </>
  );
};

export default EditModule;
