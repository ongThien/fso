This folder contains my solutions for the TypeScript module in the Fullstack open course (University of Helsinki)
---
# TypeScript

## Background & Introduction

TypeScript is a programming language designed for large-scale JavaScript development created by Microsoft.

## Main Principles

TypeScript is a typed superset of JavaScript and eventually it compiled (or transpiled, to be more accurate) into plain JavaScript (which the programmers are free to decide the version of the generated code, as long as it's ECMAScript 3 or newer).TypeScript consists of three separate, but mutually fulfilling parts:

- The language: syntax, keywords and type annotations.
- The compiler: responsible for type information erasure at compile-time and for code transformations. It also performs static code analysis, emit warnings or errors if it find a reason to do so.
- The language service: development tools can use the type information to provide intellisense, type hints and possible refactoring alternatives.

## Key features

- Type annotation: lightweight way to record the intended contract (parameters'/arguments' types) of a function or a variable.
- Keywords: inherits all the keywords from JavaScript with some additional keywords like interface, type, enum...
- Structural typing: TypeScript is a structurally typed language. In structural typing, two elements are considered to be compatible with one another if, for each feature within the type of the first element, a corresponding and identical feature exists within the type of the second element.
- Type inference: the compiler can attempt to infer the type information if no type has been specified. Variables' types can be inferred based on their assigned value and their usage.
- Type erasure: removes all type system constructs during compilation which means there is no type information remains at runtime. The lack of runtime type information can be surprising for programmers who are used to extensively using reflection or other metadata systems.

## Why use TypeScript?

- Type checking and static code analysis. This can reduce runtime errors, and you might even be able to reduce the number of required unit tests in a project, at least concerning pure-type tests. The static code analysis doesn't only warn about wrongful type usage, but also other mistakes such as misspelling a variable or function name or trying to use a variable beyond its scope.
- Code-level documentation. It's easy to check from a function signature what kind of arguments the function can consume and what type of data it will return. This form of type annotation-bound documentation will always be up to date and it makes it easier for new programmers to start working on an existing project.
- IDEs can provide more specific and smarter intellisenses when they know exactly what types of data you are processing.

## TypeScript problems

TypeScript's type annotations and type checking exist only at compile time and no longer at runtime. Even if the compiler does not throw any errors, runtime errors are still possible. These runtime errors are especially common when handling external input, such as data received from a network request.

- Incomplete, invalid or missing types in external libs. It won't be able to infer types from external libs which are not written in TypeScript. Always check the DefinitelyTyped [GitHub page](https://github.com/DefinitelyTyped/DefinitelyTyped) first for type declarations. Otherwise, you might want to start by getting acquainted with [TypeScript's documentation](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) regarding type declarations.
- Sometimes, type inference needs assistance. Check out TypeScript's doc about [type assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) and [type guarding/narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).
- Mysterious type errors. The errors given by the type system may sometimes be quite hard to understand, especially if you use complex types. As a rule of thumb, the TypeScript error messages have the most useful information at the end of the message. When running into long confusing messages, start reading them from the end.
