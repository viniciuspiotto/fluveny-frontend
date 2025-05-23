import { BlockTypeSelect } from './block-type-select';
import CitationButton from './citation-button';
import { FormattingButtons } from './formatting-buttons';
import HistoryButtons from './history-buttons';
import { ImageButton } from './image-button';
import LinkButton from './link-button';
import { SolidColorPicker } from './solid-color-picker';
import { TextAlignSelect } from './text-align-select';

/*
[ ]: Adicionar link
[ ]: Adicionar tabela
*/
export function Toolbar() {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border bg-white px-3 py-2">
      <BlockTypeSelect />
      <TextAlignSelect />
      <SolidColorPicker />
      <HistoryButtons />
      <FormattingButtons />
      <LinkButton />
      <ImageButton />
      <CitationButton />
      {/* Tables */}
      {/* Info(?) */}
    </div>
  );
}
