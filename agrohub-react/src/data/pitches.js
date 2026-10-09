// Insira aqui o link publico entregue pelo responsavel pelo video da Fase 6.
export const PHASE_6_VIDEO_URL = "";

export function getPublicVideoUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

export const previousPitches = [
  {
    phase: 4,
    title: "Testes e melhorias",
    description: "Contato e simulador de impacto da Fase 4.",
    url: "https://youtube.com/shorts/YjEcv2xwYz8",
  },
  {
    phase: 3,
    title: "Protótipo inicial",
    description: "Primeira apresentação da navegação do AgroHub.",
    url: "https://drive.google.com/file/d/1Q60UvvN7hrO8EKcji6_TGK2RlSb9yrnV/view?usp=sharing",
  },
];
