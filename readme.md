![image](https://user-images.githubusercontent.com/75763403/124519794-c5632300-ddc0-11eb-86d9-963e36520045.png)


# 💻 Projeto

##### Neste projeto, fiz uma API REST com Node e também desenvolvi o Front-end da aplicação com o uso de React. O intuíto é mostrar os módulos disponíveis e suas respectivas aulas e, com autenticação de administrador, há a possibilidade de adicionar, editar e remover aulas e módulos.

##### É possível realizar o cadastro de novos usuários que serão imediatamente administradores capazes de fazer as alterações específicas.

Disponível em: https://devlearn-rodrigorvsn.vercel.app/

---

# 🛠 Ferramentas Utilizadas

#### Programas Utilizados

- Visual Studio Code (IDE)
- Microsoft Edge (navegador)
- Beekeper Studio (verificar o estado do banco de dados)
- Insomnia (testar as requisições)

#### Front-end

- React (TS)
- Material UI
- React-hook-form
- Axios
- React-router-dom

#### Back-end

- Node (TS)
- Postgres (Banco de Dados ⚠️ Precisa instalar o driver)
- TypeORM (ORM para facilitar o controle do BD)
- Express
- Bcrypt (encriptar a senha)
- JSON web token
- CORS (para poder utilizar a api no web)

---

# 🚀 Como executar

- Entre na pasta respectiva ao backend e utilize o comando `yarn dev` para inicializar o servidor backend local (localhost:4000 - Necessário instalar o <a href="https://www.postgresql.org/">driver do Postgres</a>).

- As informações do banco de dados estão disponíveis no arquivo ormconfig.json, dentro da pasta do back-end.

- Com o servidor em execução você deve ir a pasta do front-end e utilizar o comando `yarn start` para dar início ao front-end local (localhost:3000). Você também pode utilizar o front-end hospedado na vercel disponível em https://devlearn-rodrigorvsn.vercel.app/.

- Com o servidor e o banco de dados ativos e com a página front-end aberta em seu navegador, já é possível utilizar o site.

- Você pode cadastrar usuários, fazer o login do usuário e, ao ter este login autenticado, o token é salvo no localstorage. Com isso, o acesso à página de administração é liberado e assim é possível fazer o CRUD de aulas e módulos. Para verificar as alterações feitas, deve-se atualizar a página do navegador.

---

# ⚠️ Possíveis erros e alertas

- Se você tiver notado que a tela está carregando infinitamente, provavelmente houve algum erro no banco de dados. Neste caso, deve-se interromper o servidor back-end através do terminal e iniciá-lo novamente. Após isso, basta atualizar a página no navegador.
- Se você adicionar 2 módulos em seguida o servidor irá crashar.
- Para ver as alterações feitas na página de administração, você deve atualizar a página do navegador.

---

##### Feito com 💓 por <a href="https://www.linkedin.com/in/rodrigovictorrvsn/">Rodrigo Victor</a>
