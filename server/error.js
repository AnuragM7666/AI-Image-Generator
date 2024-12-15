// error.js
export const createError = (status, message) => {
    const err = new Error();
    err.status = status || 500; // Default to 500 if no status is provided
    err.message = message || "Something went wrong!";
    return err;
};
