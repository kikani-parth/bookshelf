import * as React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { queryCache } from "react-query";
import { buildUser, buildBook } from "test/generate";
import * as auth from "auth-provider";
import { AppProviders } from "context";
import { App } from "app";

// after each test, clear the queryCache and auth.logout
afterEach(async () => {
  queryCache.clear();
  await auth.logout();
});

test("renders all the book information", async () => {
  // "authenticate" the client by setting the auth.localStorageKey in localStorage to some string value
  window.localStorage.setItem(auth.localStorageKey, "FAKE_TOKEN");

  const user = buildUser();
  const book = buildBook();

  const route = `/book/${book.id}`;

  window.history.pushState({}, "page title", route);

  const originalFetch = window.fetch;
  window.fetch = async (url, config) => {
    if (url.endsWith("/bootstrap")) {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          user: { ...user, token: "FAKE_TOKEN" },
          listItems: [],
        }),
      });
    } else if (url.endsWith("/list-items")) {
      return Promise.resolve({
        ok: true,
        json: async () => ({ listItems: [] }),
      });
    } else if (url.endsWith(`/books/${book.id}`)) {
      return Promise.resolve({
        ok: true,
        json: async () => ({ book }),
      });
    }
    return originalFetch(url, config);
  };

  // render the App component and set the wrapper to the AppProviders
  // (that way, all the same providers we have in the app will be available in our tests)
  render(<App />, { wrapper: AppProviders });

  await waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);

  expect(screen.getByRole("heading", { name: book.title })).toBeInTheDocument();
  expect(screen.getByText(book.author)).toBeInTheDocument();
  expect(screen.getByText(book.publisher)).toBeInTheDocument();
  expect(screen.getByText(book.synopsis)).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /book cover/i })).toHaveAttribute(
    "src",
    book.coverImageUrl
  );
  expect(
    screen.getByRole("button", { name: /add to list/i })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("button", { name: /remove from list/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /mark as read/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /mark as unread/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("textbox", { name: /notes/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("radio", { name: /star/i })
  ).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/start date/i)).not.toBeInTheDocument();
});
