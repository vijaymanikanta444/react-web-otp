import React, { useEffect, useRef, useState, useId } from "react";

const OTPInput = ({
  length = 4,
  onSubmit = (otp) => {
    console.log(
      { otp },
      "Please send the onSubmit props to OTPInput to handle the otp"
    );
  },
  autoFocus = false,
  otpType = "text",
  renderInput = ({ key, ...restProps }) => <input key={key} {...restProps} />,
  customStyle = {},
  separatorInterval = 1,
  seperator = "",
  prefix = "",
  includePrefix = false,
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const otpInputRef = useRef([]);
  const id = useId();

  const otpTpyeMapper = {
    number: "tel",
    text: "text",
    password: "password",
  };

  useEffect(() => {
    setOtp(new Array(length || 4).fill(""));
  }, [length]);

  // to focus the first element
  useEffect(() => {
    if (otpInputRef.current[0] && autoFocus) {
      otpInputRef.current[0].focus();
    }
  }, [length]);

  const onHandleOtpSubmit = (resultantOtp) => {
    onSubmit(
      `${
        includePrefix && prefix ? prefix.substring(prefix.length - 1) : ""
      }${resultantOtp}`
    );
  };

  const onHandleInputChange = (e, index) => {
    const { value } = e.target;
    if (otpType === "number" && isNaN(value)) return;
    if (otpType === "text" && /[^a-zA-Z0-9]/.test(value)) return;

    const newOtp = [...otp];
    // Allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // focus on very next input on value given
    if (value && otpInputRef.current[index + 1] && index < length - 1) {
      otpInputRef.current[index + 1].focus();
    }

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onHandleOtpSubmit(combinedOtp);
    }
  };

  const onHandleClick = (index) => {
    otpInputRef.current[index].setSelectionRange(1, 1);
  };

  const onHandleKeyDown = (e, index) => {
    const { key } = e;
    if (
      key === "Backspace" &&
      otpInputRef.current[index - 1] &&
      index > 0 &&
      !otp[index]
    ) {
      otpInputRef.current[index - 1].focus();
    }
    if (key === "ArrowLeft" && index > 0 && otpInputRef.current[index - 1]) {
      otpInputRef.current[index - 1].focus();
      setTimeout(() => {
        const inputLength = otpInputRef.current[index - 1].value.length;
        otpInputRef.current[index - 1].setSelectionRange(
          inputLength,
          inputLength
        );
      }, 0);
    }
    if (
      key === "ArrowRight" &&
      index < length - 1 &&
      otpInputRef.current[index + 1]
    ) {
      otpInputRef.current[index + 1].focus();
    }
  };

  const onHandlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);

    // Check if pasted data matches the otpType
    if (otpType === "number" && !/^\d*$/.test(pastedData)) return;
    if (otpType === "pin" && !/^\d*$/.test(pastedData)) return;
    if (otpType === "text" && /[^a-zA-Z0-9]/.test(pastedData)) return;

    const splittedPastedData = pastedData.split("");

    let newOtp = [...otp];

    for (let i = 0; i < length; i++) {
      if (otpInputRef.current[i]) {
        otpInputRef.current[i].value = splittedPastedData[i] || "";
        newOtp[i] = splittedPastedData[i] || "";
      }
    }

    setOtp(newOtp);

    if (newOtp.indexOf("") > 0 && newOtp.indexOf("") < length) {
      otpInputRef.current[newOtp.indexOf("")].focus();
    }

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onHandleOtpSubmit(combinedOtp);
    }
  };

  const shouldRenderSeparator = (index) => {
    if (Array.isArray(separatorInterval)) {
      let cumulativeIndex = 0;
      for (let i = 0; i < separatorInterval.length; i++) {
        cumulativeIndex += separatorInterval[i];
        if (index + 1 === cumulativeIndex) {
          return true;
        }
      }
      return false;
    }
    return (index + 1) % separatorInterval === 0;
  };

  const seperatorProps = {
    style: {
      margin: "0 5px",
    },
  };

  return (
    <>
      {prefix && (
        <React.Fragment>
          {renderInput({
            value: prefix?.substring(prefix.length - 1),
            style: {
              height: "40px",
              width: "40px",
              textAlign: "center",
              fontSize: "1.2em",
              margin: "5px",
              ...customStyle,
            },
            disabled: true,
          })}
          {(separatorInterval === 0 ||
            (Array.isArray(separatorInterval) &&
              separatorInterval?.includes(0))) &&
            (typeof seperator === "function"
              ? seperator({ ...seperatorProps })
              : seperator.substring(seperator.length - 1) || null)}
        </React.Fragment>
      )}
      {otp.map((value, index) => {
        const inputProps = {
          key: `${index}_${id}`,
          type: otpTpyeMapper[otpType],
          ref: (input) => (otpInputRef.current[index] = input),
          value: value,
          onChange: (e) => onHandleInputChange(e, index),
          onClick: () => onHandleClick(index),
          onKeyDown: (e) => onHandleKeyDown(e, index),
          onPaste: (e) => onHandlePaste(e),
          style: {
            height: "40px",
            width: "40px",
            textAlign: "center",
            fontSize: "1.2em",
            margin: "5px",
            ...customStyle,
          },
        };

        return (
          <React.Fragment key={index}>
            {renderInput({
              ...inputProps,
            })}
            {shouldRenderSeparator(index) &&
              index + 1 < length &&
              (typeof seperator === "function"
                ? seperator({ ...seperatorProps })
                : seperator.substring(seperator.length - 1) || null)}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default OTPInput;
