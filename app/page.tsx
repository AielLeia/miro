import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4">
      this is only for auth user
      <div>
        <UserButton />
      </div>
    </div>
  );
}
