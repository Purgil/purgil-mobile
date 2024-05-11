const regex = {
  phone: /(0(10|11|16|17|18|19))-?[0-9]{4}-?[0-9]{4}/g,
  password:
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()=+])[A-Za-z\d!@#$%^&*()=+]{8,}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
}

export default regex
