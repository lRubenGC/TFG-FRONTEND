export const invalidEmail = (email: string) => {
    
}

// Validation: Valid password format
export const isValidPassword = (password: string) => {
    const passwordPattern = new RegExp('^[a-zA-Z0-9_,-.*!?¿çñ@]{8,}$');

    if (!passwordPattern.test(password)) {
        return false;
    }
    return true;
}

// Validation: Valid username format
export const isValidUsername = (username: string) => {
    const usernamePattern = new RegExp('^[a-zA-Z0-9_ñç]{3,}$');

    if (!usernamePattern.test(username)) {
        return false;
    }
    return true;
}