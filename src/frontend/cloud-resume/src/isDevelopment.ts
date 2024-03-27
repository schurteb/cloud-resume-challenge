function isDevelopment() {
  return process.env.NODE_ENV === "development";
};

export default isDevelopment;
