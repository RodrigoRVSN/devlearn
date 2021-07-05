import { Grid } from "@material-ui/core";
import { useState } from "react";

import { api } from "../../services/api";
import { IClasses } from "../../@types/IClasses";
import { useModules } from "../../hooks/useModules";

import Header from "../../components/Header";
import ClassesMap from "../../components/ClassesMap";
import "./styles.scss";
import Loading from "../../components/Loading";

export function Home(): JSX.Element {
  const { modules, loading } = useModules();
  const [classes, setClasses] = useState<IClasses[]>();

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
        {loading ? (
          <>
            <h2>MÓDULOS</h2>
            <h4>
              Selecione os módulos! Ao abrir um módulo, as aulas estarão no fim
              da página.
            </h4>
            {modules?.length === 0 && <h3>Não há módulos no momento</h3>}
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
                      className="module-card toLeft"
                      onClick={() => classesInModule(item.id)}
                    >
                      <h2>{item.module}</h2>
                      <h3>
                        {item.amount === 1
                          ? "1 aula"
                          : item.amount > 1
                          ? `${item.amount} aulas`
                          : `Sem aulas`}
                      </h3>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </>
        ) : (
          <Loading />
        )}
        <span id="spacer">AULAS</span>
        {classes && <ClassesMap classes={classes} />}
      </div>
    </>
  );
}
