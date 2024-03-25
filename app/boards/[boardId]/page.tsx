import Canvas from '@/app/boards/[boardId]/_components/canvas';

type BoardPageProps = {
  params: {
    boardId: string;
  };
};

const BoardPage = ({ params }: BoardPageProps) => {
  return <Canvas boardId={params.boardId} />;
};

export default BoardPage;
