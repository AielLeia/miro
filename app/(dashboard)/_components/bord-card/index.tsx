'use client';

import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { useAuth } from '@clerk/nextjs';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

import Footer from '@/app/(dashboard)/_components/bord-card/footer';
import Overlay from '@/app/(dashboard)/_components/bord-card/overlay';
import Actions from '@/components/actions';
import { Skeleton } from '@/components/ui/skeleton';

type BoardCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  organizationId: string;
  isFavorites: boolean;
};

const BoardCard = ({
  createdAt,
  isFavorites,
  authorId,
  authorName,
  imageUrl,
  organizationId,
  title,
  id,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? 'You' : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  const { mutate: favoriteBoard, pending: pendingFavorite } = useApiMutation(
    api.board.favoriteBoard
  );
  const { mutate: unfavoriteBoard, pending: pendingUnfavorite } =
    useApiMutation(api.board.unfavoriteBoard);

  const handleUnfavoriteBoard = async () => {
    try {
      await unfavoriteBoard({ id });
      toast.success('Unfavorite board');
    } catch (err) {
      toast.error('Failed to unfavorite board');
    }
  };

  const handleFavoriteBoard = async () => {
    try {
      await favoriteBoard({ id, organizationId });
      toast.success('Favorite board');
    } catch (err) {
      toast.error('Failed to favorite board');
    }
  };

  const toggleFavorite = async () => {
    if (isFavorites) {
      return await handleUnfavoriteBoard();
    }

    return await handleFavoriteBoard();
  };

  return (
    <Link href={`/boards/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fill" />
          <Overlay />
          <Actions id={id} title={title} side={'right'}>
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>

        <Footer
          isFavorites={isFavorites}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="group aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export default BoardCard;
