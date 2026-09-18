import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { kitsExemplo, doadoresExemplo, beneficiariosExemplo } from '../data/exemplos';

// Chaves usadas para guardar cada lista no AsyncStorage
const CHAVE_KITS = '@volta_kits';
const CHAVE_DOADORES = '@volta_doadores';
const CHAVE_BENEFICIARIOS = '@volta_beneficiarios';

// Context que compartilha os dados com todas as telas
const DadosContext = createContext();

export function DadosProvider({ children }) {
  const [kits, setKits] = useState([]);
  const [doadores, setDoadores] = useState([]);
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Na montagem, lê o que está salvo; se não houver nada, usa os exemplos
  useEffect(() => {
    async function carregar() {
      try {
        const kitsSalvos = await AsyncStorage.getItem(CHAVE_KITS);
        const doadoresSalvos = await AsyncStorage.getItem(CHAVE_DOADORES);
        const beneficiariosSalvos = await AsyncStorage.getItem(CHAVE_BENEFICIARIOS);
        setKits(kitsSalvos ? JSON.parse(kitsSalvos) : kitsExemplo);
        setDoadores(doadoresSalvos ? JSON.parse(doadoresSalvos) : doadoresExemplo);
        setBeneficiarios(beneficiariosSalvos ? JSON.parse(beneficiariosSalvos) : beneficiariosExemplo);
      } catch (erro) {
        console.log('Erro ao carregar dados:', erro);
        setKits(kitsExemplo);
        setDoadores(doadoresExemplo);
        setBeneficiarios(beneficiariosExemplo);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  // Sempre que uma lista mudar, salva no AsyncStorage (só depois de carregar)
  useEffect(() => {
    if (carregando) return;
    async function salvar() {
      try {
        await AsyncStorage.setItem(CHAVE_KITS, JSON.stringify(kits));
        await AsyncStorage.setItem(CHAVE_DOADORES, JSON.stringify(doadores));
        await AsyncStorage.setItem(CHAVE_BENEFICIARIOS, JSON.stringify(beneficiarios));
      } catch (erro) {
        console.log('Erro ao salvar dados:', erro);
      }
    }
    salvar();
  }, [kits, doadores, beneficiarios, carregando]);

  // Gera um id único a partir do horário atual
  function gerarId() {
    return Date.now().toString();
  }

  // Kits
  function adicionarKit(kit) {
    setKits([...kits, { ...kit, id: gerarId() }]);
  }

  function removerKit(id) {
    setKits(kits.filter((kit) => kit.id !== id));
  }

  // Doadores
  function adicionarDoador(doador) {
    setDoadores([...doadores, { ...doador, id: gerarId() }]);
  }

  function removerDoador(id) {
    setDoadores(doadores.filter((doador) => doador.id !== id));
  }

  // Famílias (beneficiários)
  function adicionarBeneficiario(beneficiario) {
    setBeneficiarios([
      ...beneficiarios,
      { ...beneficiario, id: gerarId(), atendido: false, kitId: null },
    ]);
  }

  function removerBeneficiario(id) {
    setBeneficiarios(beneficiarios.filter((b) => b.id !== id));
  }

  // Entrega: tira 1 do estoque do kit e marca a família como atendida
  function registrarEntrega(beneficiarioId, kitId) {
    setKits(
      kits.map((kit) =>
        kit.id === kitId ? { ...kit, quantidade: kit.quantidade - 1 } : kit
      )
    );
    setBeneficiarios(
      beneficiarios.map((b) =>
        b.id === beneficiarioId ? { ...b, atendido: true, kitId: kitId } : b
      )
    );
  }

  return (
    <DadosContext.Provider
      value={{
        kits,
        doadores,
        beneficiarios,
        carregando,
        adicionarKit,
        removerKit,
        adicionarDoador,
        removerDoador,
        adicionarBeneficiario,
        removerBeneficiario,
        registrarEntrega,
      }}
    >
      {children}
    </DadosContext.Provider>
  );
}

// Hook para acessar os dados em qualquer tela
export function useDados() {
  return useContext(DadosContext);
}
