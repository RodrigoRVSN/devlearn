import { Paper } from "@material-ui/core";

import "./styles.scss";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";

export function Home(): JSX.Element {
  const history = useHistory();

  return (
    <>
      <Header />
      <div id="home-page">
        <h2>MÓDULOS</h2>
        <h3>Selecione os módulos!</h3>
      </div>
    </>
  );
}
