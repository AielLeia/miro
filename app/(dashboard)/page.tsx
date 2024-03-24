'use client';

import { useOrganization } from '@clerk/nextjs';

import BoardList from '@/app/(dashboard)/_components/board-list';
import EmptyOrganization from '@/app/(dashboard)/_components/empty-organization';

type DashboardRootPageProps = {
  searchParams: {
    search?: string;
    favorites?: string;
  };
};

const DashboardRootPage = ({ searchParams }: DashboardRootPageProps) => {
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrganization />
      ) : (
        <BoardList organizationId={organization.id} query={searchParams} />
      )}
    </div>
  );
};

export default DashboardRootPage;
