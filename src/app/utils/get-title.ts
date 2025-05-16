export const getTitle = (
  topic: string | undefined,
  topics: { slug: string; name: string }[],
) => {
  if (!topic) return '';

  if (topic === 'introduction') return 'Introdução';
  if (topic === 'final-challenge') return 'Desafio Final';

  const match = topics.find((t) => t.slug === topic);
  return match ? match.name : 'Tópico Desconhecido';
};
