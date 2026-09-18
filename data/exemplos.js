// Dados iniciais usados quando o AsyncStorage ainda está vazio

export const kitsExemplo = [
  {
    id: '1',
    nome: 'Kit Infantil',
    nivel: 'Educação Infantil',
    itens: 'giz de cera, caderno de desenho, massinha, mochila',
    quantidade: 3,
  },
  {
    id: '2',
    nome: 'Kit Fundamental',
    nivel: 'Fundamental I',
    itens: 'caderno, lápis, borracha, apontador, mochila',
    quantidade: 2,
  },
  {
    id: '3',
    nome: 'Kit Ensino Médio',
    nivel: 'Ensino Médio',
    itens: 'caderno universitário, caneta, régua, calculadora',
    quantidade: 0,
  },
];

export const doadoresExemplo = [
  {
    id: '4',
    nome: 'Maria Souza',
    telefone: '54999990001',
    email: 'maria@email.com',
    pessoaJuridica: false,
  },
  {
    id: '5',
    nome: 'Papelaria Central',
    telefone: '5432220002',
    email: 'contato@papelariacentral.com',
    pessoaJuridica: true,
  },
];

export const beneficiariosExemplo = [
  {
    id: '6',
    responsavel: 'Ana Lima',
    telefone: '54999990003',
    estudante: 'Pedro Lima',
    escola: 'EMEF São José',
    nivel: 'Fundamental I',
    atendido: false,
    kitId: null,
  },
  {
    id: '7',
    responsavel: 'Carlos Pereira',
    telefone: '54999990004',
    estudante: 'Júlia Pereira',
    escola: 'EMEI Pequeno Príncipe',
    nivel: 'Educação Infantil',
    atendido: false,
    kitId: null,
  },
  {
    id: '8',
    responsavel: 'Fernanda Costa',
    telefone: '54999990005',
    estudante: 'Lucas Costa',
    escola: 'Colégio Estadual Caxias',
    nivel: 'Ensino Médio',
    atendido: false,
    kitId: null,
  },
  {
    id: '9',
    responsavel: 'Roberto Silva',
    telefone: '54999990006',
    estudante: 'Bianca Silva',
    escola: 'EMEF Santa Rita',
    nivel: 'Fundamental I',
    atendido: true,
    kitId: '2',
  },
];
