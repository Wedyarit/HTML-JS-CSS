# JS Timeout
Write a function that will loop through an array of integers and output the index of each element with a delay of 3 seconds.

## Regular mistakes

The most popular and incorrect solution by JavaScript developers is as follows:
```js
const arr = [10, 12, 15, 21];
for (var i = 0; i <arr.length; i ++) {
  setTimeout (function () {
    console.log ('The index of this number is:' + i);
  }, 3000);
}
```

## Explanation
In this case, the code will output “Index: 4, element: undefined” (repeated 4 times). This is because the setTimeout function
is an inner (nested) function that has access to the variables of the outer function. There is a for loop in the outer function, in
which initializes the variable i - the index for iterating over the array. After 3 seconds, the function code is executed, the value i is displayed,
which at the end of the loop is 4 because it goes through 0, 1, 2, 3, 4 and stops at 4.


## Contributing
The work was done and prepared by [@Wedyarit (Vyacheslav)](https://github.com/Wedyarit).

## Feedback
Telegram: [@Wedyarit](https://t.me/Wedyarit)