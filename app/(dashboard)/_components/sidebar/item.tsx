'use client';

import { cn } from '@/lib/utils';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import Image from 'next/image';

import Hint from '@/components/hint';

type ItemProps = {
  id: string;
  name: string;
  imageUrl: string;
};

const Item = ({ name, imageUrl, id }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = async () => {
    if (!setActive) {
      return;
    }

    await setActive({ organization: id });
  };

  return (
    <div className="aspect-square relative ">
      <Hint label={name} side="right" align="start" sideOffset={18}>
        <Image
          src={imageUrl}
          alt={name}
          onClick={onClick}
          fill
          className={cn(
            'rounded-md cursor-pointer opacity-75 hover:opacity-100 transition',
            isActive && 'opacity-100'
          )}
        />
      </Hint>
    </div>
  );
};

export default Item;
