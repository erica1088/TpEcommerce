export const password = {
    required: true,
    minLength: {
      value: 3,
      message: "El mínimo de carácteres es 3",
    },
    maxLength: {
      value: 6,
      message: "El máximo de carácteres es 6",
    },
  };

  
  export const email = {
    required: true,
    minLength: {
      value: 3,
      message: "El mínimo de carácteres es 3",
    },
    maxLength: {
      value: 20,
      message: "El máximo de carácteres es 20",
    },
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "El formato del email no es válido",
    },
  };
  
  export const username = {
    required: true,
    minLength: {
      value: 3,
      message: "El mínimo de carácteres es 3",
    },
    maxLength: {
      value: 20,
      message: "El máximo de carácteres es 20",
    },
  };