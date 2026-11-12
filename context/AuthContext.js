import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

// Chaves próprias da autenticação (separadas das chaves de dados)
const CHAVE_USUARIOS = '@voltaaulas:usuarios';
const CHAVE_SESSAO = '@voltaaulas:sessao'; // guarda só o id do usuário logado

// Mesma mensagem para e-mail inexistente e senha errada:
// assim ninguém descobre quais e-mails estão cadastrados
const ERRO_LOGIN = 'E-mail ou senha incorretos.';

// Deixa o e-mail num formato único: sem espaços e em minúsculas
function normalizarEmail(email) {
  return email.trim().toLowerCase();
}

// Gera o hash SHA-256 da senha. Nunca guardamos a senha em texto puro.
// O e-mail entra junto como um "sal" simples: duas pessoas com a mesma senha
// terão hashes diferentes. Em produção, isso ficaria num servidor usando
// bcrypt ou argon2, que são feitos para serem lentos contra força bruta.
async function hashSenha(email, senha) {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    normalizarEmail(email) + ':' + senha
  );
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Na abertura do app: lê usuários e sessão salvos
  useEffect(() => {
    async function carregar() {
      try {
        const usuariosSalvos = await AsyncStorage.getItem(CHAVE_USUARIOS);
        let lista = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

        // Primeiro uso: cria o usuário de demonstração (só o hash da senha é gravado)
        if (lista.length === 0) {
          const demo = {
            id: Date.now().toString(),
            nome: 'Voluntário Demo',
            email: 'demo@voltaasaulas.com',
            senhaHash: await hashSenha('demo@voltaasaulas.com', '123456'),
            criadoEm: new Date().toISOString(),
          };
          lista = [demo];
          await AsyncStorage.setItem(CHAVE_USUARIOS, JSON.stringify(lista));
        }
        setUsuarios(lista);

        // Se havia sessão salva, o usuário continua logado
        const idSessao = await AsyncStorage.getItem(CHAVE_SESSAO);
        setUsuarioLogado(lista.find((u) => u.id === idSessao) || null);
      } catch (erro) {
        console.log('Erro ao carregar usuários:', erro);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  // Grava o id do usuário como sessão e o deixa logado
  async function iniciarSessao(usuario) {
    await AsyncStorage.setItem(CHAVE_SESSAO, usuario.id);
    setUsuarioLogado(usuario);
  }

  // Cria a conta e já entra. Lança erro se o e-mail já existir.
  async function cadastrar({ nome, email, senha }) {
    const emailNormalizado = normalizarEmail(email);
    if (usuarios.some((u) => u.email === emailNormalizado)) {
      throw new Error('Este e-mail já está cadastrado.');
    }

    const novo = {
      id: Date.now().toString(),
      nome: nome.trim(),
      email: emailNormalizado,
      senhaHash: await hashSenha(emailNormalizado, senha),
      criadoEm: new Date().toISOString(),
    };
    const lista = [...usuarios, novo];
    await AsyncStorage.setItem(CHAVE_USUARIOS, JSON.stringify(lista));
    setUsuarios(lista);
    await iniciarSessao(novo);
  }

  // Confere e-mail e senha comparando os hashes
  async function entrar(email, senha) {
    const emailNormalizado = normalizarEmail(email);
    const usuario = usuarios.find((u) => u.email === emailNormalizado);
    const hash = await hashSenha(emailNormalizado, senha);
    if (!usuario || usuario.senhaHash !== hash) {
      throw new Error(ERRO_LOGIN);
    }
    await iniciarSessao(usuario);
  }

  // Apaga a sessão: o app volta para a tela de login
  async function sair() {
    await AsyncStorage.removeItem(CHAVE_SESSAO);
    setUsuarioLogado(null);
  }

  return (
    <AuthContext.Provider value={{ usuarios, usuarioLogado, carregando, cadastrar, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para acessar a autenticação em qualquer tela
export function useAuth() {
  return useContext(AuthContext);
}
