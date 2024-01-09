import React, { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

export function SimpleWordcloud() {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const words = [
    {
      text: "2030",
      value: 11,
    },
    {
      text: "Que",
      value: 36,
    },
    {
      text: "Meu",
      value: 16,
    },
    {
      text: "orgulho",
      value: 35,
    },
    {
      text: "homem",
      value: 15,
    },
    {
      text: "pra",
      value: 60,
    },
    {
      text: "tudo",
      value: 29,
    },
    {
      text: "certo",
      value: 7,
    },
    {
      text: "mesmo",
      value: 20,
    },
    {
      text: "vcs",
      value: 11,
    },
    {
      text: "Lula",
      value: 255,
    },
    {
      text: "nosso",
      value: 60,
    },
    {
      text: "presidente",
      value: 174,
    },
    {
      text: "dio",
      value: 11,
    },
    {
      text: "dos",
      value: 31,
    },
    {
      text: "por",
      value: 62,
    },
    {
      text: "isso",
      value: 46,
    },
    {
      text: "tem",
      value: 59,
    },
    {
      text: "foi",
      value: 25,
    },
    {
      text: "fazer",
      value: 21,
    },
    {
      text: "para",
      value: 121,
    },
    {
      text: "Brasil",
      value: 147,
    },
    {
      text: "que",
      value: 296,
    },
    {
      text: "outros",
      value: 7,
    },
    {
      text: "LULA",
      value: 72,
    },
    {
      text: "melhor",
      value: 33,
    },
    {
      text: "entre",
      value: 6,
    },
    {
      text: "come",
      value: 11,
    },
    {
      text: "bem",
      value: 25,
    },
    {
      text: "nos",
      value: 23,
    },
    {
      text: "era",
      value: 14,
    },
    {
      text: "estar",
      value: 6,
    },
    {
      text: "ncia",
      value: 21,
    },
    {
      text: "pela",
      value: 8,
    },
    {
      text: "pessoa",
      value: 6,
    },
    {
      text: "meu",
      value: 40,
    },
    {
      text: "Deus",
      value: 63,
    },
    {
      text: "bom",
      value: 18,
    },
    {
      text: "ver",
      value: 14,
    },
    {
      text: "Marina",
      value: 13,
    },
    {
      text: "Silva",
      value: 20,
    },
    {
      text: "importante",
      value: 6,
    },
    {
      text: "trabalho",
      value: 18,
    },
    {
      text: "menos",
      value: 11,
    },
    {
      text: "esse",
      value: 31,
    },
    {
      text: "est",
      value: 67,
    },
    {
      text: "dinheiro",
      value: 18,
    },
    {
      text: "blico",
      value: 6,
    },
    {
      text: "com",
      value: 120,
    },
    {
      text: "fazendo",
      value: 7,
    },
    {
      text: "quando",
      value: 9,
    },
    {
      text: "povo",
      value: 37,
    },
    {
      text: "poder",
      value: 6,
    },
    {
      text: "agora",
      value: 12,
    },
    {
      text: "dia",
      value: 20,
    },
    {
      text: "vem",
      value: 6,
    },
    {
      text: "Amaz",
      value: 8,
    },
    {
      text: "nia",
      value: 11,
    },
    {
      text: "Grande",
      value: 10,
    },
    {
      text: "Estadista",
      value: 7,
    },
    {
      text: "todo",
      value: 11,
    },
    {
      text: "mundo",
      value: 25,
    },
    {
      text: "nem",
      value: 26,
    },
    {
      text: "vai",
      value: 32,
    },
    {
      text: "Luiz",
      value: 11,
    },
    {
      text: "cio",
      value: 19,
    },
    {
      text: "Presidente",
      value: 97,
    },
    {
      text: "Minha",
      value: 13,
    },
    {
      text: "vida",
      value: 18,
    },
    {
      text: "estamos",
      value: 8,
    },
    {
      text: "uma",
      value: 55,
    },
    {
      text: "casa",
      value: 11,
    },
    {
      text: "olha",
      value: 6,
    },
    {
      text: "voc",
      value: 37,
    },
    {
      text: "querido",
      value: 14,
    },
    {
      text: "aqui",
      value: 21,
    },
    {
      text: "tempo",
      value: 6,
    },
    {
      text: "coment",
      value: 6,
    },
    {
      text: "rios",
      value: 17,
    },
    {
      text: "pobre",
      value: 10,
    },
    {
      text: "fica",
      value: 6,
    },
    {
      text: "POVO",
      value: 7,
    },
    {
      text: "BRASILEIRO",
      value: 7,
    },
    {
      text: "faz",
      value: 20,
    },
    {
      text: "ajudar",
      value: 13,
    },
    {
      text: "Mais",
      value: 7,
    },
    {
      text: "pessoas",
      value: 24,
    },
    {
      text: "mais",
      value: 66,
    },
    {
      text: "foram",
      value: 6,
    },
    {
      text: "precisa",
      value: 8,
    },
    {
      text: "vergonha",
      value: 11,
    },
    {
      text: "como",
      value: 35,
    },
    {
      text: "nossa",
      value: 9,
    },
    {
      text: "hora",
      value: 15,
    },
    {
      text: "ano",
      value: 11,
    },
    {
      text: "fez",
      value: 11,
    },
    {
      text: "anos",
      value: 22,
    },
    {
      text: "governo",
      value: 26,
    },
    {
      text: "grande",
      value: 12,
    },
    {
      text: "muito",
      value: 45,
    },
    {
      text: "minha",
      value: 14,
    },
    {
      text: "gente",
      value: 12,
    },
    {
      text: "Parab",
      value: 65,
    },
    {
      text: "Nosso",
      value: 11,
    },
    {
      text: "nas",
      value: 20,
    },
    {
      text: "vel",
      value: 30,
    },
    {
      text: "tanta",
      value: 6,
    },
    {
      text: "ter",
      value: 36,
    },
    {
      text: "senhor",
      value: 20,
    },
    {
      text: "Orgulho",
      value: 11,
    },
    {
      text: "seus",
      value: 9,
    },
    {
      text: "sim",
      value: 10,
    },
    {
      text: "discurso",
      value: 11,
    },
    {
      text: "dele",
      value: 6,
    },
    {
      text: "conta",
      value: 8,
    },
    {
      text: "cara",
      value: 29,
    },
    {
      text: "estou",
      value: 8,
    },
    {
      text: "pro",
      value: 11,
    },
    {
      text: "gado",
      value: 9,
    },
    {
      text: "entender",
      value: 7,
    },
    {
      text: "sabe",
      value: 11,
    },
    {
      text: "chora",
      value: 6,
    },
    {
      text: "picanha",
      value: 9,
    },
    {
      text: "dar",
      value: 7,
    },
    {
      text: "PARA",
      value: 8,
    },
    {
      text: "SEU",
      value: 6,
    },
    {
      text: "BRASIL",
      value: 10,
    },
    {
      text: "DEUS",
      value: 17,
    },
    {
      text: "ele",
      value: 41,
    },
    {
      text: "sobre",
      value: 7,
    },
    {
      text: "sou",
      value: 15,
    },
    {
      text: "Sou",
      value: 8,
    },
    {
      text: "rio",
      value: 34,
    },
    {
      text: "todos",
      value: 41,
    },
    {
      text: "mas",
      value: 23,
    },
    {
      text: "maior",
      value: 7,
    },
    {
      text: "seja",
      value: 6,
    },
    {
      text: "assim",
      value: 7,
    },
    {
      text: "paz",
      value: 6,
    },
    {
      text: "Como",
      value: 12,
    },
    {
      text: "apoia",
      value: 6,
    },
    {
      text: "bolsa",
      value: 6,
    },
    {
      text: "fam",
      value: 13,
    },
    {
      text: "lia",
      value: 15,
    },
    {
      text: "mulher",
      value: 7,
    },
    {
      text: "lar",
      value: 6,
    },
    {
      text: "sal",
      value: 14,
    },
    {
      text: "comprar",
      value: 8,
    },
    {
      text: "comida",
      value: 7,
    },
    {
      text: "porque",
      value: 15,
    },
    {
      text: "tamb",
      value: 9,
    },
    {
      text: "coisa",
      value: 6,
    },
    {
      text: "quer",
      value: 14,
    },
    {
      text: "vezes",
      value: 7,
    },
    {
      text: "quem",
      value: 26,
    },
    {
      text: "trabalha",
      value: 8,
    },
    // {
    //     text: "ser",
    //     value: 46
    // },
    // {
    //     text: "sempre",
    //     value: 37
    // },
    // {
    //     text: "nada",
    //     value: 22
    // },
    // {
    //     text: "amor",
    //     value: 8
    // },
    // {
    //     text: "lula",
    //     value: 20
    // },
    // {
    //     text: "essa",
    //     value: 23
    // },
    // {
    //     text: "sem",
    //     value: 23
    // },
    // {
    //     text: "Por",
    //     value: 7
    // },
    // {
    //     text: "onde",
    //     value: 13
    // },
    // {
    //     text: "parab",
    //     value: 15
    // },
    // {
    //     text: "fala",
    //     value: 15
    // },
    // {
    //     text: "COMO",
    //     value: 6
    // },
    // {
    //     text: "PRESIDENTE",
    //     value: 33
    // },
    // {
    //     text: "parte",
    //     value: 7
    // },
    // {
    //     text: "seu",
    //     value: 24
    // },
    // {
    //     text: "sua",
    //     value: 35
    // },
    // {
    //     text: "pais",
    //     value: 7
    // },
    // {
    //     text: "das",
    //     value: 11
    // },
    // {
    //     text: "ainda",
    //     value: 11
    // },
    // {
    //     text: "situa",
    //     value: 7
    // },
    // {
    //     text: "pobres",
    //     value: 6
    // },
    // {
    //     text: "esta",
    //     value: 8
    // },
    // {
    //     text: "Vamos",
    //     value: 6
    // },
    // {
    //     text: "falar",
    //     value: 10
    // },
    // {
    //     text: "Esse",
    //     value: 29
    // },
    // {
    //     text: "Isso",
    //     value: 13
    // },
    // {
    //     text: "nao",
    //     value: 7
    // },
    // {
    //     text: "lulaoficial",
    //     value: 11
    // },
    // {
    //     text: "quero",
    //     value: 7
    // },
    // {
    //     text: "pagar",
    //     value: 8
    // },
    // {
    //     text: "gra",
    //     value: 6
    // },
    // {
    //     text: "verdade",
    //     value: 10
    // },
    // {
    //     text: "pol",
    //     value: 9
    // },
    // {
    //     text: "tica",
    //     value: 10
    // },
    // {
    //     text: "pode",
    //     value: 13
    // },
    // {
    //     text: "Macei",
    //     value: 9
    // },
    // {
    //     text: "luta",
    //     value: 6
    // },
    // {
    //     text: "fora",
    //     value: 8
    // },
    // {
    //     text: "for",
    //     value: 9
    // },
    // {
    //     text: "cora",
    //     value: 10
    // },
    // {
    //     text: "deve",
    //     value: 6
    // },
    // {
    //     text: "aben",
    //     value: 33
    // },
    // {
    //     text: "Vai",
    //     value: 9
    // },
    // {
    //     text: "suas",
    //     value: 7
    // },
    // {
    //     text: "novo",
    //     value: 7
    // },
    // {
    //     text: "Com",
    //     value: 7
    // },
    // {
    //     text: "certeza",
    //     value: 6
    // },
    // {
    //     text: "SILVA",
    //     value: 12
    // },
    // {
    //     text: "QUE",
    //     value: 17
    // },
    // {
    //     text: "PARAB",
    //     value: 7
    // },
    // {
    //     text: "pior",
    //     value: 8
    // },
    // {
    //     text: "Agora",
    //     value: 8
    // },
    // {
    //     text: "Mas",
    //     value: 9
    // },
    // {
    //     text: "toda",
    //     value: 6
    // },
    // {
    //     text: "urnas",
    //     value: 6
    // },
    // {
    //     text: "acordos",
    //     value: 6
    // },
    // {
    //     text: "Boa",
    //     value: 7
    // },
    // {
    //     text: "pelo",
    //     value: 25
    // },
    // {
    //     text: "sair",
    //     value: 7
    // },
    // {
    //     text: "Bom",
    //     value: 12
    // },
    // {
    //     text: "nunca",
    //     value: 9
    // },
    // {
    //     text: "lhe",
    //     value: 7
    // },
    // {
    //     text: "brasileira",
    //     value: 7
    // },
    // {
    //     text: "futuro",
    //     value: 6
    // },
    // {
    //     text: "sendo",
    //     value: 12
    // },
    // {
    //     text: "coisas",
    //     value: 9
    // },
    // {
    //     text: "ssimo",
    //     value: 6
    // },
    // {
    //     text: "pois",
    //     value: 7
    // },
    // {
    //     text: "der",
    //     value: 7
    // },
    // {
    //     text: "estadista",
    //     value: 10
    // },
    // {
    //     text: "hist",
    //     value: 6
    // },
    // {
    //     text: "ria",
    //     value: 19
    // },
    // {
    //     text: "Dino",
    //     value: 6
    // },
    // {
    //     text: "Bahia",
    //     value: 6
    // },
    // {
    //     text: "tenho",
    //     value: 10
    // },
    // {
    //     text: "vez",
    //     value: 12
    // },
    // {
    //     text: "Muito",
    //     value: 9
    // },
    // {
    //     text: "disse",
    //     value: 7
    // },
    // {
    //     text: "viu",
    //     value: 6
    // },
    // {
    //     text: "lindo",
    //     value: 10
    // },
    // {
    //     text: "blica",
    //     value: 9
    // },
    // {
    //     text: "brasileiro",
    //     value: 12
    // },
    // {
    //     text: "dessa",
    //     value: 6
    // },
    // {
    //     text: "equipe",
    //     value: 7
    // },
    // {
    //     text: "Vida",
    //     value: 10
    // },
    // {
    //     text: "floresta",
    //     value: 6
    // },
    // {
    //     text: "deixar",
    //     value: 7
    // },
    // {
    //     text: "imposto",
    //     value: 6
    // },
    // {
    //     text: "Governo",
    //     value: 6
    // },
    // {
    //     text: "vamos",
    //     value: 8
    // },
    // {
    //     text: "elei",
    //     value: 8
    // },
    // {
    //     text: "STF",
    //     value: 7
    // },
    // {
    //     text: "colocou",
    //     value: 7
    // },
    // {
    //     text: "impostos",
    //     value: 6
    // },
    // {
    //     text: "continua",
    //     value: 8
    // },
    // {
    //     text: "nesse",
    //     value: 7
    // },
    // {
    //     text: "acontecendo",
    //     value: 6
    // },
    // {
    //     text: "Voc",
    //     value: 6
    // },
    // {
    //     text: "Gratid",
    //     value: 6
    // },
    // {
    //     text: "Ser",
    //     value: 6
    // },
    // {
    //     text: "poss",
    //     value: 9
    // },
    // {
    //     text: "temos",
    //     value: 8
    // },
    // {
    //     text: "juntos",
    //     value: 6
    // },
    // {
    //     text: "Ele",
    //     value: 6
    // },
    // {
    //     text: "boa",
    //     value: 7
    // },
    // {
    //     text: "Tem",
    //     value: 6
    // },
    // {
    //     text: "Foi",
    //     value: 6
    // },
    // {
    //     text: "favor",
    //     value: 6
    // },
    // {
    //     text: "todas",
    //     value: 6
    // },
    // {
    //     text: "ses",
    //     value: 10
    // },
    // {
    //     text: "noite",
    //     value: 8
    // },
    // {
    //     text: "000",
    //     value: 6
    // },
    // {
    //     text: "COM",
    //     value: 9
    // },
    // {
    //     text: "respeito",
    //     value: 9
    // },
    // {
    //     text: "nico",
    //     value: 7
    // },
    // {
    //     text: "muita",
    //     value: 6
    // },
    // {
    //     text: "mal",
    //     value: 6
    // },
    // {
    //     text: "Viva",
    //     value: 11
    // },
    // {
    //     text: "brasileiros",
    //     value: 9
    // },
    // {
    //     text: "the",
    //     value: 6
    // },
    // {
    //     text: "and",
    //     value: 6
    // },
    // {
    //     text: "Casa",
    //     value: 6
    // },
    // {
    //     text: "cada",
    //     value: 10
    // },
    // {
    //     text: "continue",
    //     value: 7
    // },
    // {
    //     text: "ESSE",
    //     value: 6
    // },
    // {
    //     text: "Obrigado",
    //     value: 8
    // },
    // {
    //     text: "Avante",
    //     value: 6
    // },
    {
      text: "Jesus",
      value: 9,
    },
    {
      text: "SENHOR",
      value: 8,
    },
    {
      text: "AND",
      value: 9,
    },
    {
      text: "THE",
      value: 6,
    },
  ];

  const options = {
    rotations: 0,
    colors: ["#556AFB", "#33429A", "#0A27E6"],
    fontWeight: "700",
    fontFamily: "Impact",
    fontSizes: [20, 40] as [number, number],
  };

  return (
    <div style={{ height: "100%" }}>
      {client && <ReactWordcloud words={words} options={options} />}
    </div>
  );
}
