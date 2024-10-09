import reducer, {
  initialState as sample,
  createAnecdote,
  vote,
} from "./anecdoteReducer";
import deepFreeze from "deep-freeze";

describe("anecdoteReducer", () => {
  test("should return new state with action NEW", () => {
    const initialState = sample;
    deepFreeze(initialState);

    const testAction = createAnecdote("test");
    const newState = reducer(initialState, testAction);

    expect(newState).toHaveLength(initialState.length + 1);
    expect(newState).toContainEqual(testAction.payload);
  });

  test("should be able to vote with action VOTE", () => {
    const initialState = sample;
    deepFreeze(initialState);
    const tobeVoted =
      initialState[Math.floor(Math.random() * initialState.length)];

    const testAction = vote(tobeVoted.id);
    const newState = reducer(initialState, testAction);

    const voted = newState.find((anecdote) => anecdote.id === tobeVoted.id);

    expect(voted.votes).toEqual(tobeVoted.votes + 1);
  });
});
