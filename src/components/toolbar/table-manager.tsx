import { useCurrentEditor } from '@tiptap/react';
import {
  BetweenHorizonalEnd,
  BetweenHorizonalStart,
  BetweenVerticalEnd,
  BetweenVerticalStart,
  Grid2X2,
  Grid2X2Plus,
  Grid2X2X,
  LayoutPanelLeft,
  LayoutPanelTop,
  Table,
  Table2,
  TableCellsMerge,
  TableCellsSplit,
} from 'lucide-react';
import { Button } from '../ui/button';
import PopoverToolbar from './popover-toolbar';

export default function TableManager() {
  const { editor } = useCurrentEditor();

  if (!editor) return;

  function handleTable() {
    if (!editor) return;

    if (editor.isActive('table')) {
      if (
        !window.confirm('Isso vai apagar a tabela inteira! Deseja continuar?')
      )
        return;
      editor.chain().focus().deleteTable().run();
    } else {
      editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
    }
  }

  return (
    <div className="rounded-md border p-1">
      <Button
        title={editor.isActive('table') ? 'Apagar Tabela' : 'Criar Tabela'}
        variant={editor.isActive('table') ? 'default' : 'ghost'}
        onClick={handleTable}
      >
        <Table />
      </Button>
      <PopoverToolbar trigger={<Grid2X2Plus />}>
        <Button
          variant="ghost"
          title="Adicionar Linha"
          onClick={() => {
            editor.chain().focus().addRowAfter().run();
          }}
        >
          <BetweenHorizonalStart />
        </Button>
        <Button
          variant="ghost"
          title="Adicionar Coluna"
          onClick={() => {
            editor.chain().focus().addColumnAfter().run();
          }}
        >
          <BetweenVerticalStart />
        </Button>
      </PopoverToolbar>
      <PopoverToolbar trigger={<Grid2X2X />}>
        <Button
          variant="ghost"
          title="Remover Linha"
          onClick={() => {
            editor.chain().focus().deleteRow().run();
          }}
        >
          <BetweenHorizonalEnd />
        </Button>
        <Button
          variant="ghost"
          title="Remover Coluna"
          onClick={() => {
            editor.chain().focus().deleteColumn().run();
          }}
        >
          <BetweenVerticalEnd />
        </Button>
      </PopoverToolbar>
      <PopoverToolbar trigger={<Table2 />}>
        <Button
          variant="ghost"
          title="Alterar Cabeçalho de Linha"
          onClick={() => {
            editor.chain().focus().toggleHeaderRow().run();
          }}
        >
          <LayoutPanelTop />
        </Button>
        <Button
          variant="ghost"
          title="Alterar Cabeçalho de Coluna"
          onClick={() => {
            editor.chain().focus().toggleHeaderColumn().run();
          }}
        >
          <LayoutPanelLeft />
        </Button>
        <Button
          variant="ghost"
          title="Alterar Cabeçalho de Célula"
          onClick={() => {
            editor.chain().focus().toggleHeaderCell().run();
          }}
        >
          <Grid2X2 />
        </Button>
      </PopoverToolbar>
      <Button
        title={editor.can().splitCell() ? 'Separar Células' : 'Mesclar Células'}
        variant={editor.can().mergeOrSplit() ? 'default' : 'ghost'}
        onClick={() => {
          editor.chain().focus().mergeOrSplit().run();
        }}
      >
        {editor.can().mergeCells() ? <TableCellsMerge /> : <TableCellsSplit />}
      </Button>
    </div>
  );
}
