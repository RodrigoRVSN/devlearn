/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IModules } from "../@types/IModules";
import { api } from "../services/api";

type useModulesProps = {
  modules: IModules[] | undefined;
  setModules: Dispatch<SetStateAction<IModules[] | undefined>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  getModules: () => void;
};

export function useModules(): useModulesProps {
  const [modules, setModules] = useState<IModules[]>();
  const [loading, setLoading] = useState(false);

  /* Deve-se atualizar a página para ver as mudanças */

  async function getModules() {
    await api.get(`/modules`).then((res) => {
      res.data?.map((item: any, index: any) => {
        async function moduleCheckClasses() {
          await api.get(`/${item.id}/classes`).then((response) => {
            res.data[index] = {
              ...item,
              amount: response.data.length,
              module:
                item.module.charAt(0).toUpperCase() + item.module.substr(1),
            };
            if (index === res.data.length - 1) {
              setLoading(true);
            }
          });
        }
        moduleCheckClasses();
        return res.data;
      });

      setModules(res.data);

      if (!modules) {
        setLoading(!loading);
      }

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

  useEffect(() => {
    getModules();
  }, [loading]);

  return {
    modules,
    setModules,
    loading,
    setLoading,
    getModules,
  };
}
