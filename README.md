# React Web OTP

## _A Customizable OTP Input Component for React_

React Web OTP is a customizable OTP (One-Time Password) input component for React applications, designed to enhance user authentication experiences.

## Features

- Supports various input types: number, text, and password
- Customizable input fields
- Auto-focus and auto-tab between inputs
- Clipboard paste handling with validation
- Custom styles for input fields

And of course, React Web OTP itself is open source with a [public repository](https://github.com/vijaymanikanta444/react-web-otp) on GitHub.

## Installation

React Web OTP requires [Node.js](https://nodejs.org/) v10+ to run.

Install the package via npm:

```sh
npm install react-web-otp
```

Or via yarn:

```sh
yarn add react-web-otp
```

<!-- ## Demo

A `live demo` of the OTPInput component can be found [here](https://google.com/). -->

## Usage

Here's an example of how to use the `OTPInput` component in your React application:

```sh
import React from 'react';
import OTPInput from 'react-web-otp';

const App = () => {
  const handleSubmit = (otp) => {
    console.log('Submitted OTP:', otp);
  };

   const customSeperator = (props) => {
    return <span {...props}>#</span>;
  };

  return (
    <div>
      <h1>Enter your OTP</h1>
      <span>With Prefix</span>
      <br />
      <OTPInput
        length={6}
        onSubmit={handleSubmit}
        autoFocus
        otpType="number"
        customStyle={{ border: "1px solid #ccc", borderRadius: "4px" }}
        includePrefix
        prefix={"H"}
        seperator={"-"}
        separatorInterval={2}
      />

      <br />
      <span>Prefix with seperator</span>
      <br />
      <OTPInput
        length={6}
        onSubmit={handleSubmit}
        autoFocus
        otpType="number"
        customStyle={{ border: "1px solid #ccc", borderRadius: "4px" }}
        includePrefix
        prefix={"H"}
        seperator={"-"}
        separatorInterval={[0, 2]}
      />

      <br />
      <span>With out Prefix</span>
      <br />
      <OTPInput
        length={6}
        onSubmit={handleSubmit}
        seperator={customSeperator}
        separatorInterval={[2, 3]}
      />
    </div>
  );
};

export default App;
```

<img width="475" alt="Screenshot 2024-08-18 at 4 35 02 AM" src="https://github.com/user-attachments/assets/b2f3b211-dc3c-4683-a359-15ec334655fb" style="border: 2px solid black;">

## Props API

The `OTPInput` component accepts the following props:
Prop Name| Type| Default| Description

---

| Prop Name         | Type                        | Default                                                                                       | Description                                                                                                                                                                                                                                                        |
| ----------------- | --------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| length            | `number`                    | 4                                                                                             | The number of OTP input fields.                                                                                                                                                                                                                                    |
| onSubmit          | `func`                      | (otp) => console.log({ otp }, "Please send the onSubmit props to OTPInput to handle the otp") | Function to handle the OTP submission.                                                                                                                                                                                                                             |
| autoFocus         | `bool`                      | false                                                                                         | If true, the first input field will be focused automatically.                                                                                                                                                                                                      |
| otpType           | `string`                    | text                                                                                          | The type of OTP input, can be one of "number", "text", "password".                                                                                                                                                                                                 |
| renderInput       | `func`                      | ({ key, ...restProps }) => <input key={key} {...restProps} />                                 | Custom render function for the input fields.                                                                                                                                                                                                                       |
| customStyle       | `object`                    | {}                                                                                            | Custom styles to apply to each input field.                                                                                                                                                                                                                        |
| includePrefix     | `boolean`                   | false                                                                                         | If the includePrefix is true then the otp returned from the onSubmit function will include the prefix                                                                                                                                                              |
| prefix            | `string`                    | ""                                                                                            | The prefix length should not exceed 1 if it exceed more than 1 then the last value is taken if prefix = 'HG' then the prefix will be G                                                                                                                             |
| seperator         | `string or react component` | ""                                                                                            | if the type of seperator is string then the length should be 1 if it exceeded by 1 then then the last character of the string will be used as a seperator. we can also send the seperator as a react component `(props) => { return <span {...props}>@123</span>}` |
| separatorInterval | `number or number[]`        | ""                                                                                            | the seperatorInterval can be either string or array of strings. If `separatorInterval is number then the seperator will render with that interval` and if the `separatorInterval is array of numbers then the seperator will render by each number in the array`   |

## Development

React Web OTP uses a simple React setup for development. Make changes in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

```sh
npm start
```

## License

`ISC`
