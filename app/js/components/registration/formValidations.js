import render from './render';

export default {
    userInput(username) {

        // first remove any whitespace
        username = username.trim();

        const reg = /[^a-zA-Z0-9_.\-]/i

        if (!username) {

        // response empty after trim, so render feedback
            render.validations('Please enter a username');
            return false;

        } else if (reg.test(username)) {

        // if regex test fails, render feedback
            render.validations('Please use only alphanumeric characters or the following: _ - .');
            return false;
        }

        // validation passes
        return true;
    }
};