interface Arguments {
  firstArg: number;
  rest: number[];
}

const convertToNumber = (str: string): number => {
  const num = Number(str);
  if (isNaN(num)) {
    throw new Error("Provided values were not numbers!");
  } else {
    return num;
  }
};

export const parseArguments = (processArguments: string[]): Arguments => {
  const [_tsNode, _filename, ...args] = processArguments;
  const [firstArg, ...rest] = args.map((arg) => {
    try {
      return convertToNumber(arg);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        process.exit(1);
      }
    }
  });
  return {
    firstArg,
    rest,
  };
};
