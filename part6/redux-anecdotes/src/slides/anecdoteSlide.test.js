import reducer, { initialState as sample } from "./anecdoteSlide";
import deepFreeze from "deep-freeze";

describe("anecdoteReducer", () => {
  test("should return new state with action anecdotes/create", () => {
    const initialState = sample;
    const testAction = {
      type: "anecdotes/create",
      payload: "test",
    };

    deepFreeze(initialState);
    const newState = reducer(initialState, testAction);

    expect(newState).toHaveLength(initialState.length + 1);
    expect(newState.map((s) => s.content)).toContainEqual(testAction.payload);
  });

  test("should be able to vote with action anecdotes/vote", () => {
    const initialState = sample;
    const tobeVoted =
      initialState[Math.floor(Math.random() * initialState.length)];
    const testAction = {
      type: "anecdotes/vote",
      payload: tobeVoted.id,
    };

    deepFreeze(initialState);
    const newState = reducer(initialState, testAction);

    const voted = newState.find((anecdote) => anecdote.id === tobeVoted.id);

    expect(voted.votes).toEqual(tobeVoted.votes + 1);
  });
});
