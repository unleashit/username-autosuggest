import render from './render';

export default {
    userInput(username) {

        const reg = /[^a-zA-Z0-9_.\-]/i

        if (!username) {

        // response empty after trim, so render feedback
            render.validations('Please enter a username');
            return false;
        } else if (username.length < 4) {

        // require 4 or more characters
            render.validations('Please choose a username with 4 or more characters');
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