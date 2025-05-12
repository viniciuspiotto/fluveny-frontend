interface TagProps {
  name: string;
}

export const Tag = ({ name }: TagProps) => {
  return (
    <li className="flex rounded-md bg-zinc-50 px-2 py-1 text-sm lg:px-3 lg:py-2 lg:text-base">
      {name}
    </li>
  );
};
