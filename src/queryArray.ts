export class QueryArray<T> {
  constructor(public array: T[]) {}

  public sort(key: string, order: SortOrder) {
    switch (order) {
      case SortOrder.ASC:
        return this.array.sort((a, b) => {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        });
        break;
      case SortOrder.DESC:
        return this.array.sort((a, b) => {
          if (a[key] > b[key]) return -1;
          if (a[key] < b[key]) return 1;
          return 0;
        });
    }
  }

  public where(where: any) {
    const keys = Object.keys(where);
    const filtered = [];

    for (let item of this.array) {
      let matches = true;
      for (let k of keys) {
        switch (typeof where[k]) {
          case "number":
            {
              if (item[k] !== where[k]) {
                matches = false;
              }
            }
            break;
          case "string":
            {
              if (!item[k].includes(where[k])) {
                matches = false;
              }
            }
            break;
          case "object":
            {
              if (
                where[k] instanceof ILikeParam ||
                where[k] instanceof BetweenParam
              ) {
                if (where[k] instanceof ILikeParam) {
                  if (!item[k].includes(where[k].param)) {
                    matches = false;
                  }
                }

                if (where[k] instanceof BetweenParam) {
                  if (
                    typeof where[k] !== typeof item[k].rangeStart ||
                    typeof where[k] !== typeof item[k].rangeEnd
                  ) {
                    throw new Error(
                      "Incompatible type for comparison in between"
                    );
                  }
                  if (
                    item[k] < where[k].rangeStart ||
                    item[k] > where[k].rangeEnd
                  ) {
                    matches = false;
                  }
                }
              } else {
                throw new Error('Incompatible attribute in where clause');
              }
            }
            break;
        }
      }
      matches ? filtered.push(item) : false;
    }
    return filtered;
  }
}

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export function ILike(param: string) {
  return new ILikeParam(param);
}

export function Between(rangeStart: number | Date, rangeEnd: number | Date) {
  return new BetweenParam(rangeStart, rangeEnd);
}

export class ILikeParam {
  constructor(public param: string) {}
}

export class BetweenParam {
  constructor(
    public rangeStart: number | Date,
    public rangeEnd: number | Date
  ) {}
}
