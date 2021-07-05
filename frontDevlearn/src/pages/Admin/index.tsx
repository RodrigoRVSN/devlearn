import { Grid } from "@material-ui/core";

import "./styles.scss";
import { api } from "../../services/api";
import { AddModule } from "../../components/AddModule";
import { AddClasses } from "../../components/AddClasses";
import DeleteModule from "../../components/DeleteModule";

import { useState } from "react";
import { IClasses } from "../../@types/IClasses";
import EditModule from "../../components/EditModule";
import DeleteClass from "../../components/DeleteClass";
import EditClass from "../../components/EditClass";
import { useChange } from "../../hooks/useChange";

export function Admin(): JSX.Element {
  const [classes, setClasses] = useState<IClasses[]>();
  const { modules, loading } = useChange();

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
      <div id="home-page">
        <h2>PÁGINA DE ADMINISTRAÇÃO</h2>
        <h4>
          Obs: Ao clicar em um módulo, o ID dele será copiado automaticamente
          para a sua área de transferência. Ao Adicionar uma aula, basta colar
          esse módulo que você copiou ao clicar.
        </h4>
        <AddModule />
        <AddClasses />
        {loading && (
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
                      <div className="button-container">
                        <DeleteModule module_id={item.id} />
                        <EditModule module_id={item.id} />
                      </div>
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
                      <h3>{item.moduleClass.module}</h3>
                      <h3>{item.name_class}</h3>
                      <h3>{item.dataClass}</h3>
                      <div className="button-container">
                        <DeleteClass class_id={item.id} />
                        <EditClass class_id={item.id} />
                      </div>
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
