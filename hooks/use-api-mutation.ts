import { useMutation } from 'convex/react';
import { FunctionReference, OptionalRestArgs } from 'convex/server';
import { useState } from 'react';

export const useApiMutation = <T extends FunctionReference<'mutation'>>(
  mutationFunction: T
) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  const mutate = async (payload: OptionalRestArgs<T>[0]) => {
    setPending(true);

    try {
      return await apiMutation(payload);
    } catch (err) {
      throw err;
    } finally {
      setPending(false);
    }
  };

  return { mutate, pending };
};
