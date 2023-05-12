export const isValidEmail = (email: string) => {
    const correoPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return correoPattern.test(email);
}

// Validation: Valid password format
export const isValidPassword = (password: string) => {
    const passwordPattern = new RegExp('^[a-zA-Z0-9_,-.*!?¿çñ@]{8,}$');
    
    return passwordPattern.test(password);
}

// Validation: Valid username format
export const isValidUsername = (username: string) => {
    const usernamePattern = new RegExp('^[a-zA-Z0-9_ñç]{3,}$');

    return usernamePattern.test(username);
}