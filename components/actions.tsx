import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { useRenameModal } from '@/store/use-rename-modal';
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { Link2, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import ConfirmModal from '@/components/confirm-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ActionsProps = {
  children: React.ReactNode;
  side?: DropdownMenuContentProps['side'];
  sideOffset?: DropdownMenuContentProps['sideOffset'];
  id: string;
  title: string;
};

const Actions = ({ children, side, sideOffset, id, title }: ActionsProps) => {
  const { onOpen } = useRenameModal();

  const { mutate: removeBoard, pending } = useApiMutation(
    api.board.removeBoard
  );

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/boards/${id}`
    );
    toast.success('Link copied');
  };

  const onDelete = async () => {
    try {
      await removeBoard({ id });
      toast.success('Board deleted');
    } catch (err) {
      toast.error('Failed to delete board');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className="w-60"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
          <Link2 className="w-4 h-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className="p-3 cursor-pointer"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          onConfirm={onDelete}
          header="Delete board ?"
          description="This will delete the board and all of its contents"
          disabled={pending}
        >
          <Button
            variant="ghost"
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
