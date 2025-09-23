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
  type LucideIcon,
} from 'lucide-react';
import { Button } from '../ui/button';
import PopoverToolbar from './popover-toolbar';

interface ToolbarButtonProps {
  title: string;
  onClick: () => void;
  icon: LucideIcon;
  active: boolean;
}

function ToolbarButton({
  title,
  onClick,
  icon: Icon,
  active,
}: ToolbarButtonProps) {
  const variant = active ? 'default' : 'ghost';
  return (
    <Button variant={variant} title={title} onClick={onClick} type="button">
      <Icon />
    </Button>
  );
}

export default function TableManager() {
  const { editor } = useCurrentEditor();

  if (!editor) return;

  const handleTable = () => {
    if (editor.isActive('table')) {
      if (
        !window.confirm('Isso vai apagar a tabela inteira! Deseja continuar?')
      )
        return;
      editor.chain().focus().deleteTable().run();
    } else {
      editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
    }
  };

  return (
    <div className="rounded-md">
      <ToolbarButton
        title={editor.isActive('table') ? 'Apagar Tabela' : 'Criar Tabela'}
        onClick={handleTable}
        icon={Table}
        active={editor.isActive('table')}
      />
      <PopoverToolbar trigger={<Grid2X2Plus />}>
        <ToolbarButton
          title="Adicionar Linha"
          onClick={() => editor.chain().focus().addRowAfter().run()}
          icon={BetweenVerticalStart}
          active={false}
        />
        <ToolbarButton
          title="Adicionar Coluna"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          icon={BetweenHorizonalStart}
          active={false}
        />
      </PopoverToolbar>
      <PopoverToolbar trigger={<Grid2X2X />}>
        <ToolbarButton
          title="Remover Linha"
          onClick={() => editor.chain().focus().deleteRow().run()}
          icon={BetweenVerticalEnd}
          active={false}
        />
        <ToolbarButton
          title="Remover Coluna"
          onClick={() => editor.chain().focus().deleteColumn().run()}
          icon={BetweenHorizonalEnd}
          active={false}
        />
      </PopoverToolbar>
      <PopoverToolbar trigger={<Table2 />}>
        <ToolbarButton
          title="Alterar Cabeçalho de Linha"
          onClick={() => editor.chain().focus().toggleHeaderRow().run()}
          icon={LayoutPanelTop}
          active={false}
        />
        <ToolbarButton
          title="Alterar Cabeçalho de Coluna"
          onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
          icon={LayoutPanelLeft}
          active={false}
        />
        <ToolbarButton
          title="Alterar Cabeçalho de Célula"
          onClick={() => editor.chain().focus().toggleHeaderCell().run()}
          icon={Grid2X2}
          active={false}
        />
      </PopoverToolbar>
      <Button
        title={editor.can().splitCell() ? 'Separar Células' : 'Mesclar Células'}
        variant={editor.can().mergeOrSplit() ? 'default' : 'ghost'}
        onClick={() => editor.chain().focus().mergeOrSplit().run()}
        type="button"
      >
        {editor.can().mergeCells() ? <TableCellsMerge /> : <TableCellsSplit />}
      </Button>
    </div>
  );
}
