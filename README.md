# 🎒 Volta às Aulas Solidária

Aplicativo mobile que conecta **kits de material escolar** a **famílias que não conseguem comprá-los**.
A equipe da campanha cadastra os doadores, controla o estoque de kits por nível de ensino e registra
cada entrega, garantindo que nenhum estudante comece o ano sem material.

Projeto desenvolvido para a disciplina de **Desenvolvimento Mobile** (FSG).

---

## ✨ Funcionalidades

- **Login e criação de conta** locais, com sessão que continua ativa ao fechar e reabrir o app
- **Rotas protegidas**: sem login não se acessa nenhuma tela interna; logado, a tela de login não aparece
- **Painel** com saudação ao voluntário, botão de sair e os indicadores: kits em estoque, famílias aguardando, famílias atendidas e doadores cadastrados
- **Kits**: cadastro com nome, nível de ensino, itens e quantidade (estoque zerado fica em destaque)
- **Doadores**: cadastro de pessoa física ou empresa, com selo visual para pessoa jurídica
- **Famílias**: cadastro do responsável e do estudante, com status *Aguardando* ou *Atendida*
- **Entrega**: mostra apenas kits do mesmo nível da família e com estoque, confirma antes de registrar e grava qual voluntário fez a entrega ("Registrado por")
- **Exclusão** por toque longo, sempre com confirmação
- **Persistência local**: os dados continuam salvos ao fechar e reabrir o app

> Por respeito à privacidade das famílias, o app **não coleta** CPF, endereço nem data de nascimento.

---

## 🔐 Autenticação

A autenticação é **local, no próprio aparelho**, sem servidor:

- As senhas **nunca** são salvas em texto puro: o app guarda apenas o hash SHA-256 (via `expo-crypto`) de `email + ":" + senha`. O e-mail funciona como um sal simples.
- O e-mail é normalizado (sem espaços e em minúsculas) no cadastro e no login.
- Em caso de falha, o login sempre mostra a mesma mensagem, **"E-mail ou senha incorretos."**, para não revelar quais e-mails estão cadastrados.
- A sessão guarda só o id do usuário logado.
- As telas internas são protegidas com `Stack.Protected` do Expo Router.

> Em produção, a autenticação ficaria num backend, com bcrypt ou argon2.

**Usuário de demonstração** (criado automaticamente no primeiro uso e exibido na tela de login):

| E-mail | Senha |
|---|---|
| `demo@voltaasaulas.com` | `123456` |

---

## 🛠️ Tecnologias

| Recurso | Uso no projeto |
|---|---|
| [Expo](https://expo.dev) (SDK 58) | Base do app em React Native com JavaScript |
| [Expo Router](https://docs.expo.dev/router/introduction/) | Navegação por arquivos: Stack na raiz + Tabs, rotas protegidas com `Stack.Protected` |
| React Context + Hooks | Estado global (`useState`, `useEffect`, `useContext`): `AuthContext` e `DadosContext` |
| AsyncStorage | Persistência dos dados, dos usuários e da sessão no aparelho |
| `expo-crypto` | Hash SHA-256 das senhas |
| `@expo/vector-icons` (Ionicons) | Ícones das abas e do painel |
| Componentes nativos do React Native | View, Text, TextInput, FlatList, Modal, Switch, Alert, etc. |

---

## 🚀 Como rodar

Pré-requisitos: [Node.js](https://nodejs.org) LTS e o app **Expo Go** no celular.

```powershell
# instala as dependências e inicia o servidor
.\start.ps1
```

Depois, leia o QR code com o Expo Go (Android) ou com a câmera (iOS).

Ou manualmente:

```powershell
npm install --legacy-peer-deps
npx expo start
```

> Se o PowerShell bloquear a execução de scripts, rode uma vez:
> `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`

---

## 📁 Estrutura

```
app/
  _layout.js               # Providers (Auth + Dados) + Stack com rotas protegidas
  (auth)/
    login.js               # Tela de login
    registro.js            # Criação de conta
  (tabs)/
    _layout.js             # Barra inferior com 4 abas
    index.js               # Painel
    kits.js                # Lista de kits
    doadores.js            # Lista de doadores
    beneficiarios.js       # Lista de famílias
  cadastro/
    kit.js                 # Formulário de kit
    doador.js              # Formulário de doador
    beneficiario.js        # Formulário de família
  entrega/
    [id].js                # Registrar entrega para a família com esse id
components/
  Card.js                  # Cartão genérico (usa children)
  CampoTexto.js            # Label + TextInput + mensagem de erro (usa props)
  Botao.js                 # Botão padrão
  SeletorNivel.js          # Seleção do nível de ensino
  Indicador.js             # Card numérico do painel (componente de classe)
context/
  AuthContext.js           # Usuários, login, cadastro, sessão e hash de senha
  DadosContext.js          # Estado global dos kits, doadores e famílias e persistência
data/
  exemplos.js              # Dados iniciais de demonstração
styles/
  cores.js                 # Paleta de cores
```

---

## 🗂️ Modelo de dados

```js
Kit          { id, nome, nivel, itens, quantidade }
Doador       { id, nome, telefone, email, pessoaJuridica }
Beneficiario { id, responsavel, telefone, estudante, escola, nivel, atendido, kitId, entreguePor? }
Usuario      { id, nome, email, senhaHash, criadoEm }
```

- `responsavel` é o responsável pela família. `entreguePor` é o nome do voluntário logado que registrou a entrega. Entregas antigas não têm esse campo e continuam funcionando.
- Níveis de ensino: `Educação Infantil`, `Fundamental I`, `Fundamental II`, `Ensino Médio`.

Chaves no AsyncStorage:

| Chave | Conteúdo |
|---|---|
| `@volta_kits`, `@volta_doadores`, `@volta_beneficiarios` | Listas de dados da campanha |
| `@voltaaulas:usuarios` | Usuários cadastrados (apenas com o hash da senha) |
| `@voltaaulas:sessao` | Id do usuário logado |

---

## 🔄 Fluxo principal

1. O **voluntário** entra no app (ou cria sua conta).
2. Um **doador** entrega material e a equipe cadastra o **kit** com a quantidade recebida.
3. Uma **família** se inscreve informando a escola e o nível do estudante.
4. Na aba Famílias, um toque na família abre a **entrega**, que lista só os kits compatíveis.
5. Ao confirmar, o estoque diminui em 1, a família passa a *Atendida* com "Registrado por {voluntário}" e o painel é atualizado.

---

## 👥 Equipe

- Matheus Andrighetti Borella
- Natália Bortolosso

---

## 📄 Licença

Distribuído sob a licença descrita no arquivo [LICENSE](LICENSE).
