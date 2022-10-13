# Introduction

Query array is a lib to perform sorting, search and coming soon other query language features into Typescript object arrays.

# Installation

> npm install ts-query-array

or you could use yarn

> yarn add ts-query-array

# Usage

Import into your ts file the resources needed

```
import { QueryArray, SortOrder , ILike, Between } from 'ts-query-array';
```

## 1. Sorting


```
const result = new QueryArray(array).sort('name', 'ASC');
```

```
const result = new QueryArray(array).sort('name', 'DESC');
```

## 2. Searching

### Searching specific values

```
const result = new QueryArray(array).where({
      name: 'John Doe',
      age: 32
    });
```

### Searching containing strings

```
const queryArray = new QueryArray(array).where({
      name: ILike('John'),
    });
```

### Searching ranged values
```
const queryArray = new QueryArray(array).where({
      name: ILike('John'),
      age: Between(12,50)
    });
```

## Coming soon

* Skip and limit resource to perform pagination
* Improve where to find Inner objects
