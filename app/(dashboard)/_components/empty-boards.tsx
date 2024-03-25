'use client';

import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { useOrganization } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

const EmptyBoards = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate: createNewBoard, pending } = useApiMutation(
    api.board.createNewBoard
  );

  const handleCreationBoardForOrganization = async () => {
    if (!organization) return;

    try {
      const newBoardId = await createNewBoard({
        title: 'untitled',
        organizationId: organization.id,
      });

      toast.success('Board created');
      router.push(`/boards/${newBoardId}`);
    } catch (err) {
      toast.error('Failed to create board');
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" alt="Empty boards" height={110} width={110} />
      <h2 className="text-2xl font-semibold mt-6">Create your first board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button
          disabled={pending}
          onClick={handleCreationBoardForOrganization}
          size="lg"
        >
          Create board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
