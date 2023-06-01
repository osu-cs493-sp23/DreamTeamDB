export const formatError = (error) => {
  return error.details[0].message.replace(/"/g, "");
};
