'use client';

import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type BoardButtonProps = {
  organizationId: string;
  disabled?: boolean;
};

const NewBoardButton = ({ organizationId, disabled }: BoardButtonProps) => {
  const router = useRouter();
  const { mutate: createNewBoard, pending } = useApiMutation(
    api.board.createNewBoard
  );

  const handleAddNewBoardToOrganization = async () => {
    try {
      const newBoardId = await createNewBoard({
        organizationId,
        title: 'Untitled',
      });

      toast.success('Board created');
      router.push(`/boards/${newBoardId}`);
    } catch (err) {
      toast.error('Failed to created board');
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleAddNewBoardToOrganization}
      className={cn(
        'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6',
        (pending || disabled) &&
          'opacity-75 hover:bg-blue-600 cursor-not-allowed'
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-xs text-white font-light">New board</p>
    </button>
  );
};

export default NewBoardButton;
