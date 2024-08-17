# React Web OTP

## _A Customizable OTP Input Component for React_

React Web OTP is a customizable OTP (One-Time Password) input component for React applications, designed to enhance user authentication experiences.

## Features

- Supports various input types: number, text, and password
- Customizable input fields
- Auto-focus and auto-tab between inputs
- Clipboard paste handling with validation
- Custom styles for input fields

And of course, React Web OTP itself is open source with a [public repository][react-web-otp] on GitHub.

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

## Demo

A `live demo` of the OTPInput component can be found [here](https://google.com/).

## Usage

Here's an example of how to use the `OTPInput` component in your React application:

```sh
import React from 'react';
import OTPInput from 'react-web-otp';

const App = () => {
  const handleSubmit = (otp) => {
    console.log('Submitted OTP:', otp);
  };

  return (
    <div>
      <h1>Enter your OTP</h1>
      <OTPInput
        length={6}
        onSubmit={handleSubmit}
        autoFocus={true}
        otpType="number"
        customStyle={{ border: '1px solid #ccc', borderRadius: '4px' }}
      />
    </div>
  );
};

export default App;
```

## Props API

The `OTPInput` component accepts the following props:
Prop Name| Type| Default| Description

---

| Prop Name   | Type   | Default                                                                                       | Description                                                        |
| ----------- | ------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| length      | number | 4                                                                                             | The number of OTP input fields.                                    |
| onSubmit    | func   | (otp) => console.log({ otp }, "Please send the onSubmit props to OTPInput to handle the otp") | Function to handle the OTP submission.                             |
| autoFocus   | bool   | false                                                                                         | If true, the first input field will be focused automatically.      |
| otpType     | string | text                                                                                          | The type of OTP input, can be one of "number", "text", "password". |
| renderInput | func   | ({ key, ...restProps }) => <input key={key} {...restProps} />                                 | Custom render function for the input fields.                       |
| customStyle | object | {}                                                                                            | Custom styles to apply to each input field.                        |

## Development

React Web OTP uses a simple React setup for development. Make changes in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

```sh
npm start
```

## License

`ISC`
