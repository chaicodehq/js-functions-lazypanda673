/**
 * 🎨 Mehndi Pattern Maker - Recursion
 *
 * Mehndi artist hai tu! Intricate patterns banane hain using RECURSION.
 * Yahan loops use karna MANA hai — sirf function khud ko call karega
 * (recursive calls). Har function mein base case aur recursive case hoga.
 *
 * Functions:
 *
 *   1. repeatChar(char, n)
 *      - Repeat char n times using recursion (NO loops, NO .repeat())
 *      - Base case: n <= 0 => return ""
 *      - Recursive: char + repeatChar(char, n - 1)
 *      - Agar char not a string or empty, return ""
 *
 *   2. sumNestedArray(arr)
 *      - Sum all numbers in an arbitrarily nested array
 *      - e.g., [1, [2, [3, 4]], 5] => 15
 *      - Skip non-number values
 *      - Base case: empty array => 0
 *      - Agar input not array, return 0
 *
 *   3. flattenArray(arr)
 *      - Flatten an arbitrarily nested array into a single flat array
 *      - e.g., [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
 *      - Agar input not array, return []
 *
 *   4. isPalindrome(str)
 *      - Check if string is palindrome using recursion
 *      - Case-insensitive comparison
 *      - Base case: string length <= 1 => true
 *      - Compare first and last chars, recurse on middle
 *      - Agar input not string, return false
 *
 *   5. generatePattern(n)
 *      - Generate symmetric mehndi border pattern
 *      - n = 1 => ["*"]
 *      - n = 2 => ["*", "**", "*"]
 *      - n = 3 => ["*", "**", "***", "**", "*"]
 *      - Pattern goes from 1 star up to n stars, then back down to 1
 *      - Use recursion to build the ascending part, then mirror it
 *      - Agar n <= 0, return []
 *      - Agar n is not a positive integer, return []
 *
 * Hint: Every recursive function needs a BASE CASE (when to stop) and a
 *   RECURSIVE CASE (calling itself with a smaller/simpler input).
 *
 * @example
 *   repeatChar("*", 4)        // => "****"
 *   sumNestedArray([1, [2, [3]]]) // => 6
 *   flattenArray([1, [2, [3]]]) // => [1, 2, 3]
 *   isPalindrome("madam")     // => true
 *   generatePattern(3)        // => ["*", "**", "***", "**", "*"]
 */
export function repeatChar(char, n) {
  // Your code here
  if (!char || typeof char !== "string") return "";
  if (n <= 0) return "";
  return char + repeatChar(char, n - 1);
}

export function sumNestedArray(arr) {
  // Your code here
  if (!Array.isArray(arr)) return 0;
  if (arr.length === 0) return 0;
  const head = arr[0];
  const tail = arr.slice(1);
  if (Array.isArray(head)) return sumNestedArray(head) + sumNestedArray(tail);
  if (typeof head !== "number") return sumNestedArray(tail);
  return head + sumNestedArray(tail);
}

export function flattenArray(arr) {
  // Your code here
  if (!arr || arr.length === 0) return [];
  if (!Array.isArray(arr)) return [];
  const curr = arr[0];
  const tail = arr.slice(1);
  if (Array.isArray(curr)) {
    return flattenArray(curr).concat(flattenArray(tail));
  }

  return [curr].concat(flattenArray(tail));
}

export function isPalindrome(str) {
  // Your code here
  if (typeof str !== "string") return false;
  if (str.length === 0) return true;
  const size = str.length;
  if (size <= 1) return true;
  const lowerStr = str.toLowerCase();
  if (lowerStr[0] === lowerStr[size - 1])
    return isPalindrome(lowerStr.slice(1, size - 1));

  return false;
}

export function generatePattern(n) {
  // Your code here
  if (!Number.isInteger(n)) return [];
  if (n <= 0) return [];

  const ascend = generatePattern(n - 1);

  return ascend
    .slice(0, n - 1)
    .concat(["*".repeat(n)])
    .concat(ascend.slice(n - 2));
}
