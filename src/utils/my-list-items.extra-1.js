import { useQuery, useMutation, queryCache } from "react-query";
import { client } from "./api-client";

const defaultMutationOptions = {
  onSettled: () => queryCache.invalidateQueries("list-items"),
};

function useListItems(user) {
  const { data: listItems } = useQuery({
    queryKey: "list-items",
    queryFn: () =>
      client(`list-items`, { token: user.token }).then(
        (data) => data.listItems
      ),
  });

  return listItems ?? [];
}

function useListItem(user, bookId) {
  const listItems = useListItems(user);

  const listItem = listItems.find((li) => li.bookId === bookId) ?? null;

  return listItem;
}

function useUpdateListItem(user) {
  const [update] = useMutation(
    (updates) =>
      client(`list-items/${updates.id}`, {
        method: "PUT",
        data: updates,
        token: user.token,
      }),
    defaultMutationOptions
  );

  return [update];
}

function useRemoveListItem(user) {
  const [remove] = useMutation(
    ({ id }) =>
      client(`list-items/${id}`, { method: "DELETE", token: user.token }),
    defaultMutationOptions
  );

  return [remove];
}

function useCreateListItem(user) {
  const [create] = useMutation(
    ({ bookId }) =>
      client(`list-items`, {
        data: { bookId },
        method: "POST",
        token: user.token,
      }),
    defaultMutationOptions
  );

  return [create];
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
};