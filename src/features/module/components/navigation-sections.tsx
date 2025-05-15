import { Button } from '@/components/ui/button';

const api = {
  topics: [{ title: 'Simple Present' }, { title: 'Simple Past' }],
};

export const NavigationSections = () => {
  return (
    <footer>
      {api((topic) => {
        return (
          <Button className="bg-zinc-50 px-10 py-8">
            <icon className="text-primary size-8" />
          </Button>
        );
      })}
    </footer>
  );
};
