import { OrganizationProfile } from '@clerk/nextjs';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Invite members
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none lg:max-w-[880px] md:max-w-full">
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
};

export default InviteButton;
