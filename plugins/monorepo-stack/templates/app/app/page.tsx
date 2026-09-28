import { Button } from '@repo/ui/components/button';

export default function Page() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">__APP_NAME__</h1>
      <p className="text-neutral-600">
        Running on port __PORT__. This page imports Button from{' '}
        <code className="font-mono text-sm">@repo/ui</code>, so the workspace link is
        exercised by the build rather than merely declared.
      </p>
      <div>
        <Button>Save changes</Button>
      </div>
    </main>
  );
}
