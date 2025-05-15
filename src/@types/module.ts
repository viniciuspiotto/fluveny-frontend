export type Topic = {
  id: string;
  title: string;
};

export interface ModuleCardProps {
  id: string;
  title: string;
  imgSrc: string;
  topics: Topic[];
}
