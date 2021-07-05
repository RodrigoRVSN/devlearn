import { Grid } from "@material-ui/core";

import "./styles.scss";
import Header from "../../components/Header";
import { api } from "../../services/api";
import { useState } from "react";
import { IClasses } from "../../@types/IClasses";
import { useChange } from "../../hooks/useChange";

export function Home(): JSX.Element {
  const { modules, loading } = useChange();
  const [classes, setClasses] = useState<IClasses[]>();

  /* Pega os módulos, conta as aulas de cada um e ordena os módulos */

  /* Pega as aulas do módulo clicado */

  function classesInModule(module_id: string[]) {
    navigator.clipboard.writeText(module_id.toString());
    async function getClasses() {
      await api.get(`/${module_id}/classes`).then((res) => {
        res.data.sort(function (a: IClasses, b: IClasses) {
          if (a.name_class < b.name_class) return -1;
          if (a.name_class > b.name_class) return 1;
          return 0;
        });
        setClasses(res.data);
      });
    }
    getClasses();
  }

  /* Renderização da página */

  return (
    <>
      <Header />
      <div id="home-page">
        {loading && (
          <>
            <h2>MÓDULOS</h2>
            <h4>
              Selecione os módulos! Ao abrir um módulo, as aulas estarão no fim
              da página.
            </h4>
            <Grid
              spacing={4}
              container
              style={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {modules?.map((item, index) => {
                return (
                  <Grid key={index} item xs={11} md={4} lg={3}>
                    <div
                      className="module-card"
                      onClick={() => classesInModule(item.id)}
                    >
                      <h2>{item.module}</h2>
                      <h3>
                        {item.amount === 0
                          ? "Não há aulas aqui"
                          : item.amount === 1
                          ? "1 aula"
                          : `${item.amount} aulas`}
                      </h3>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
        <span id="spacer">AULAS</span>
        {classes && (
          <>
            <Grid
              spacing={4}
              container
              style={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {classes?.map((item, index) => {
                return (
                  <Grid key={index} item xs={10} md={6} lg={5}>
                    <div className="class-card">
                      <h3>{item.name_class}</h3>
                      <h3>{item.dataClass}</h3>
                      <h3>{item.moduleClass.module}</h3>y
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </div>
    </>
  );
}
