import render from './render';

export default {
    userInput(username) {
        username = username.trim();
        const reg = /[^a-zA-Z0-9_.\-]/i

        if (!username) {
            render.validations('Please enter a username');
            return false;
        } else if (reg.test(username)) {
            render.validations('Please use only alphanumeric characters or the following: _ - .');
            return false;
        }
        return true;
    }
};