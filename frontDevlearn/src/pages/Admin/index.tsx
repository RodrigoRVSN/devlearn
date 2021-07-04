import { Grid } from "@material-ui/core";

import "./styles.scss";
import { api } from "../../services/api";
import { AddModule } from "../../components/AddModule";
import { AddClasses } from "../../components/AddClasses";
import DeleteModule from "../../components/DeleteModule";

import { useEffect, useState } from "react";
import { IModules } from "../../@types/IModules";
import { IClasses } from "../../@types/IClasses";
import EditModule from "../../components/EditModule";

export function Admin(): JSX.Element {
  const [modules, setModules] = useState<IModules[]>();
  const [classes, setClasses] = useState<IClasses[]>();
  const [loading, setLoading] = useState(false);

  /* Pega os módulos, conta as aulas de cada um e ordena os módulos */

  useEffect(() => {
    async function getModules() {
      await api.get(`/modules`).then((res) => {
        res.data?.map((item: any, index: any) => {
          async function moduleCheckClasses() {
            await api.get(`/${item.id}/classes`).then((response) => {
              res.data[index] = { ...item, amount: response.data.length };
              if (index === res.data.length - 1) {
                setLoading(true);
              }
            });
          }
          moduleCheckClasses();
          return res.data[index];
        });
        setModules(res.data);
        if (loading) {
          setModules(
            modules?.sort(function (a, b) {
              if (a.module < b.module) return -1;
              if (a.module > b.module) return 1;
              return 0;
            })
          );
        }
      });
    }
    getModules();
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Pega as aulas do módulo clicado */

  function classesInModule(module_id: string[]) {
    navigator.clipboard.writeText(module_id.toString());
    async function getClasses() {
      await api.get(`/${module_id}/classes`).then((res) => {
        setClasses(res.data);
        if (res.data.length > 1) {
          setClasses(
            classes?.sort(function (a, b) {
              if (a.name_class < b.name_class) return -1;
              if (a.name_class > b.name_class) return 1;
              return 0;
            })
          );
        }
      });
    }
    getClasses();
  }

  /* Renderização da página */

  return (
    <>
      <div id="home-page">
        {loading && (
          <>
            <h2>PÁGINA DE ADMINISTRAÇÃO</h2>
            <h4>
              Obs: Ao clicar em um módulo, o ID dele será copiado
              automaticamente para a sua área de transferência. Ao Adicionar uma
              aula, basta colar esse módulo que você copiou ao clicar.
            </h4>
            <AddModule />
            <AddClasses />
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
