export type Topic = {
  slug: string;
  name: string;
};

export interface ModuleCardProps {
  id: string;
  title: string;
  imgSrc: string;
  topics: Topic[];
}
