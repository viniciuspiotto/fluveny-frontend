import type { ModuleCardProps } from '@/@types/module';

export const modulesMock: ModuleCardProps[] = [
  {
    id: '1',
    title: "Let's to the party",
    imgSrc: 'random-url',
    topics: [
      { slug: 'simple-present', name: 'simple present' },
      { slug: 'pronoums', name: 'pronoums' },
    ],
  },
];
