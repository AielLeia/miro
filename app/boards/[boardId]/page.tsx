import Canvas from '@/app/boards/[boardId]/_components/canvas';
import Loading from '@/app/boards/[boardId]/_components/loading';
import Room from '@/components/room';

type BoardPageProps = {
  params: {
    boardId: string;
  };
};

const BoardPage = ({ params }: BoardPageProps) => {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardPage;
