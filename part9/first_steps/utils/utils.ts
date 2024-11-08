interface Arguments {
  firstArg: number;
  rest: number[];
}

export interface QueryArgs {
  height: number;
  weight: number;
}

export const convertToNumber = (str: string): number => {
  const num = Number(str);
  if (isNaN(num)) {
    throw new Error("Provided values were not numbers!");
  } else {
    return num;
  }
};

export const parseArguments = (processArguments: string[]): Arguments => {
  const [_tsNode, _filename, ...args] = processArguments;
  const numbers = args.map((arg) => {
    try {
      return convertToNumber(arg);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        process.exit(1);
      }
      // Typescript doesn't know process.exit() will stop the execution
      // we have to add an explicit return to satisfy all code path return something
      return;
    }
  });

  // "(val): val is number" is a type predicate
  // that asserts that the function will filter out all values except those that are of type number.
  // why (val): number won't work?
  // when you write val: number in the filter function, it’s like saying, "Only numbers will enter this function,"
  // but TypeScript doesn’t know that the array contains only numbers (it still thinks there could be undefined values)
  // then it will scream at you.
  const [firstArg, ...rest] = numbers.filter(
    (val): val is number => val !== undefined
  );

  return {
    firstArg,
    rest,
  };
};
