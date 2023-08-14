const hash = require("bcrypt").hash;

const hashPassword = async (password) => {
  const encryptedPassword = await hash(password, 12);
  console.log(encryptedPassword);
};

hashPassword("donut");
