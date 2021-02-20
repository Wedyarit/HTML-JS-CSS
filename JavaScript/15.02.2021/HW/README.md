# Lunch manager

When dining together in a cafe or restaurant, the problem of calculations often arises: looking for change, etc. If the same group of people dines regularly, it is easier to pay for everyone to one person each time, in turn. But in this case, it is necessary to keep records in order to periodically reduce all debts to each other to zero.

As part of this task, it is necessary to develop a program that automates the calculation of such debts.

Implement a class that encapsulates the records of all user spending and debts and can issue recommendations
in the format “who should give to whom and how much” for a certain period of time (given the start and end dates of the period specified in the form).

## Input data

- String nickname
- Dinner date using Date object
- The sum is a number in tenge. It can be either positive (paid for everyone) or negative (debt for food)
- Record identifier - string identifier of the form (0000-0000-0000-0000)

## Output example

```
user_1 -> user_2 - 3001
user_1 -> user_5 - 1011
user_4 -> user_3 - 100
```

## Notes

- Multiple requests can be made to the class being implemented.
- You will need to implement a parser that converts records in tables into such a structure.
- Interesting feature enhancements are welcome and will be appreciated.

## Contributing

The work was done and prepared by [@Wedyarit (Vyacheslav)](https://github.com/Wedyarit).

## Feedback

Telegram: [@Wedyarit](https://t.me/Wedyarit)
