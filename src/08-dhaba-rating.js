/**
 * 🍛 Highway Dhaba Rating System - Higher-Order Functions
 *
 * Highway pe dhabas ki rating system bana raha hai. Higher-order functions
 * (HOF) use karne hain — aise functions jo doosre functions ko parameter
 * mein lete hain YA return karte hain.
 *
 * Functions:
 *
 *   1. createFilter(field, operator, value)
 *      - Returns a FUNCTION that filters objects
 *      - Operators: ">", "<", ">=", "<=", "==="
 *      - e.g., createFilter("rating", ">=", 4) returns a function that
 *        takes an object and returns true if object.rating >= 4
 *      - Unknown operator => return function that always returns false
 *
 *   2. createSorter(field, order = "asc")
 *      - Returns a COMPARATOR function for Array.sort()
 *      - order "asc" => ascending, "desc" => descending
 *      - Works with both numbers and strings
 *
 *   3. createMapper(fields)
 *      - fields: array of field names, e.g., ["name", "rating"]
 *      - Returns a function that takes an object and returns a new object
 *        with ONLY the specified fields
 *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
 *
 *   4. applyOperations(data, ...operations)
 *      - data: array of objects
 *      - operations: any number of functions to apply SEQUENTIALLY
 *      - Each operation takes an array and returns an array
 *      - Apply first operation to data, then second to result, etc.
 *      - Return final result
 *      - Agar data not array, return []
 *
 * Hint: HOF = functions that take functions as arguments or return functions.
 *   createFilter returns a function. applyOperations takes functions as args.
 *
 * @example
 *   const highRated = createFilter("rating", ">=", 4);
 *   highRated({ name: "Punjab Dhaba", rating: 4.5 }) // => true
 *
 *   const byRating = createSorter("rating", "desc");
 *   [{ rating: 3 }, { rating: 5 }].sort(byRating)
 *   // => [{ rating: 5 }, { rating: 3 }]
 */
export function createFilter(field, operator, value) {
  // Your code here
  const operators = [">", "<", ">=", "<=", "==="];
  const falsy = () => {
    return false;
  };
  if (!operators.includes(operator)) return falsy;
  const checkFn = new Function("key", "value", `return key ${operator} value`);
  const objBool = (obj) => {
    return checkFn(obj[field], value);
  };
  return objBool;
}

export function createSorter(field, order = "asc") {
  // Your code here
  const comparator = (a, b) => {
    const valA = a[field];
    const valB = b[field];

    if (valA == null || valB == null) return 0;
    if (typeof valA === "number" && typeof valB === "number") {
      return order === "desc" ? valB - valA : valA - valB;
    }
    const strA = String(valA);
    const strB = String(valB);
    const strOrder = strA.localeCompare(strB, undefined, {
      sensitivity: "base",
      numeric: true,
    });
    return order === "desc" ? strOrder * -1 : strOrder;
  };
  return comparator;
}

export function createMapper(fields) {
  // Your code here
  const filFunc = (obj) => {
    if (!obj || typeof obj !== "object") return {};
    const finalObj = fields.reduce((acc, curr) => {
      if (curr in obj) acc[curr] = obj[curr];
      return acc;
    }, {});
    return finalObj;
  };

  return filFunc;
}

export function applyOperations(data, ...operations) {
  // Your code here
  if (!Array.isArray(data)) return [];
  return operations.reduce((acc, curr) => {
    if (typeof curr !== "function") return acc;
    return curr(acc);
  }, data);
}
