import { renderHook, act } from "@testing-library/react";
import { useAsync } from "../hooks";

beforeEach(() => {
  jest.spyOn(console, "error");
});

afterEach(() => {
  console.error.mockRestore();
});

function deferred() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

test("calling run with a promise which resolves", async () => {
  // get a promise and resolve function from the deferred utility
  const { promise, resolve } = deferred();

  // use renderHook with useAsync to get the result
  const { result } = renderHook(() => useAsync());

  // assert the result.current is the correct default state
  expect(result.current).toEqual({
    status: "idle",
    data: null,
    error: null,

    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,

    run: expect.any(Function),
    reset: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
  });

  //  calling 'run' updates state so it needs to be done in an `act` callback
  let p;
  act(() => {
    p = result.current.run(promise);
  });

  // assert that result.current is the correct pending state
  expect(result.current).toEqual({
    status: "pending",
    data: null,
    error: null,

    isIdle: false,
    isLoading: true,
    isError: false,
    isSuccess: false,

    run: expect.any(Function),
    reset: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
  });

  // call resolve and wait for the promise to be resolved
  const resolvedValue = Symbol("resolved value");
  await act(async () => {
    resolve(resolvedValue);
    await p;
  });

  // assert the resolved state
  expect(result.current).toEqual({
    status: "resolved",
    data: resolvedValue,
    error: null,

    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,

    run: expect.any(Function),
    reset: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
  });

  act(() => {
    result.current.reset();
  });

  //  assert the result.current has actually been reset
  expect(result.current).toEqual({
    status: "idle",
    data: null,
    error: null,

    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,

    run: expect.any(Function),
    reset: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
  });
});

test("calling run with a promise which rejects", async () => {
  const { promise, reject } = deferred();
  const { result } = renderHook(() => useAsync());

  expect(result.current).toEqual({
    status: "idle",
    data: null,
    error: null,

    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,

    run: expect.any(Function),
    reset: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
  });

  let p;
  act(() => {
    p = result.current.run(promise);
  });

  expect(result.current).toEqual({
    status: "pending",
    data: null,
    error: null,

    isIdle: false,
    isLoading: true,
    isError: false,
    isSuccess: false,

    run: expect.any(Function),
    reset: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
  });

  const rejectedValue = Symbol("rejected value");
  await act(async () => {
    reject(rejectedValue);
    await p.catch(() => {
      /* ignore error */
    });
  });

  expect(result.current).toEqual({
    data: null,
    error: rejectedValue,
    status: "rejected",

    isIdle: false,
    isLoading: false,
    isError: true,
    isSuccess: false,

    run: expect.any(Function),
    reset: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
  });
});

test("can specify an initial state", () => {
  const mockData = Symbol("resolved value");
  const customInitialState = { status: "resolved", data: mockData };
  const { result } = renderHook(() => useAsync(customInitialState));

  expect(result.current).toEqual({
    status: "resolved",
    data: mockData,
    error: null,

    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,

    run: expect.any(Function),
    reset: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
  });
});

test("can set the data", async () => {
  const mockData = Symbol("resolved value");
  const { result } = renderHook(() => useAsync());

  act(() => {
    result.current.setData(mockData);
  });

  expect(result.current).toEqual({
    status: "resolved",
    data: mockData,
    error: null,

    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,

    run: expect.any(Function),
    reset: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
  });
});

test("can set the error", () => {
  const mockError = Symbol("rejected value");
  const { result } = renderHook(() => useAsync());

  act(() => {
    result.current.setError(mockError);
  });

  expect(result.current).toEqual({
    status: "rejected",
    data: null,
    error: mockError,

    isIdle: false,
    isLoading: false,
    isError: true,
    isSuccess: false,

    run: expect.any(Function),
    reset: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
  });
});

test("No state updates happen if the component is unmounted while pending", async () => {
  const { promise, resolve } = deferred();
  const { result, unmount } = renderHook(() => useAsync());
  let p;
  act(() => {
    p = result.current.run(promise);
  });
  unmount();
  await act(async () => {
    resolve();
    await p;
  });
  expect(console.error).not.toHaveBeenCalled();
});

test('calling "run" without a promise results in an early error', async () => {
  const { result } = renderHook(() => useAsync());
  expect(() => result.current.run()).toThrowErrorMatchingInlineSnapshot(
    `"The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?"`
  );
});
