import { sanitize } from '@/app/libs/sanitize';

export const Viewer = ({ html }: { html: string }) => {
  const safeHtml = sanitize(html);

  return (
    <div
      className="prose prose-sm lg:prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
};
