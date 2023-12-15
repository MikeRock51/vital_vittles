export function validateSignUpInput(inputObject) {
    const errors = {};

    if (!inputObject.email) {
        errors.email = "Email is required!";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputObject.email)
      ) {
        errors.email = "Invalid email address!";
    } else if (!inputObject.username) {
        errors.username = "Username is required!"
    } else if (!inputObject.firstname) {
        errors.username = "First Name is required!"
    } else if (!inputObject.password) {
        errors.password = "Password is required!"
    } else if (inputObject.password.length < 8) {
        errors.password = "Password should have at least 8 characters long"
    } else if (!inputObject.confirmPassword) {
        errors.confirmPassword = "Please confirm your password"
    } else if (inputObject.confirmPassword !== inputObject.password) {
        errors.confirmPassword = "Password does not match!"
    }

    return errors;
}


export function validateSignInInput(inputObject) {
    const errors = {};

    if (!inputObject.email) {
        errors.email = "Email is required!";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputObject.email)
      ) {
        errors.email = "Invalid email address!";
    } else if (!inputObject.password) {
        errors.password = "Password is required!"
    }

    return errors;
}
