# 🎒 Volta às Aulas Solidária

Aplicativo mobile que conecta **kits de material escolar** a **famílias que não conseguem comprá-los**.
A equipe da campanha cadastra os doadores, controla o estoque de kits por nível de ensino e registra
cada entrega, garantindo que nenhum estudante comece o ano sem material.

Projeto desenvolvido para a disciplina de **Desenvolvimento Mobile** (FSG).

---

## ✨ Funcionalidades

- **Painel** com kits em estoque, famílias aguardando, famílias atendidas e doadores cadastrados
- **Kits**: cadastro com nome, nível de ensino, itens e quantidade (estoque zerado fica em destaque)
- **Doadores**: cadastro de pessoa física ou empresa, com selo visual para pessoa jurídica
- **Famílias**: cadastro do responsável e do estudante, com status *Aguardando* ou *Atendida*
- **Entrega**: mostra apenas kits do mesmo nível da família e com estoque, e confirma antes de registrar
- **Exclusão** por toque longo, sempre com confirmação
- **Persistência local**: os dados continuam salvos ao fechar e reabrir o app

> Por respeito à privacidade das famílias, o app **não coleta** CPF, endereço nem data de nascimento.

---

## 🛠️ Tecnologias

| Recurso | Uso no projeto |
|---|---|
| [Expo](https://expo.dev) (SDK 57) | Base do app em React Native com JavaScript |
| [Expo Router](https://docs.expo.dev/router/introduction/) | Navegação por arquivos: Stack na raiz + Tabs |
| React Context + Hooks | Estado global (`useState`, `useEffect`, `useContext`) |
| AsyncStorage | Persistência dos dados no aparelho |
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
  _layout.js               # Provider de dados + Stack de navegação
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
  CampoTexto.js            # Label + TextInput (usa props)
  Botao.js                 # Botão padrão
  SeletorNivel.js          # Seleção do nível de ensino
  Indicador.js             # Card numérico do painel (componente de classe)
context/
  DadosContext.js          # Estado global e persistência
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
Beneficiario { id, responsavel, telefone, estudante, escola, nivel, atendido, kitId }
```

Níveis de ensino: `Educação Infantil`, `Fundamental I`, `Fundamental II`, `Ensino Médio`.

---

## 🔄 Fluxo principal

1. Um **doador** entrega material e a equipe cadastra o **kit** com a quantidade recebida.
2. Uma **família** se inscreve informando a escola e o nível do estudante.
3. Na aba Famílias, um toque na família abre a **entrega**, que lista só os kits compatíveis.
4. Ao confirmar, o estoque diminui em 1, a família passa a *Atendida* e o painel é atualizado.

---

## 👥 Equipe

- Matheus Andrighetti Borella
- Natália Bortolosso

---

## 📄 Licença

Distribuído sob a licença descrita no arquivo [LICENSE](LICENSE).
