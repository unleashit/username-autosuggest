import axios from 'axios';
import render from './components/registration/render';
import checkUsername from './components/registration/checkUsername';
import validations from './components/registration/formValidations';

import '../scss/style.scss';

////////////////////////////
// test boilerplate begin
// left this in as it is part of the test setup. But converted to axios since I wasn't using jquery for anything else
////////////////////////////

// The User search API accepts a comma-separated list of usernames, and returns
// user data for any matching records
axios.get("http://chegg-tutors.appspot.com/coding-challenge/api/user/?username=Hillary2016").then(function (data) {
	// This logs Hillary2016's user data, since the username is registered
	console.log(JSON.stringify(data.data));
});
axios("http://chegg-tutors.appspot.com/coding-challenge/api/user/?username=Trump4Pres,FeelTheBern1").then(function (data) {
	// This logs Trump4Pres's user data, since the username is registered, but
	// no user data for FeelTheBern1, since that username is not currently registered
	console.log(JSON.stringify(data.data));
});
////////////////////////////
// end of test boilerplate
////////////////////////////

////////////////////////////
// begin app
////////////////////////////

let submitBtn = document.getElementById('chg-balloon-submit');
let input = document.getElementById('chg-balloon-input');

// Note: a more accessible solution would be to add a form tag in the html and check for onsubmit (supports enter key by default)
submitBtn.addEventListener('click', (e)=> {
    render.clearAll();
    if (validations.userInput(input.value)) {
        // checkUsername.getServerCalls() === 0 ?
        //     checkUsername.firstTime(input.value) :
        //     checkUsername.repeatedTime(input.value, checkUsername.handleSuggestions())
        checkUsername.queryServer(input.value);
    }
    input.value = '';
});






// let checkUsers = document.getElementById('check-users'),
//     results = document.getElementById('results');
//
// checkUsers.addEventListener('submit', (e)=> {
//    e.preventDefault();
//
//     let val = checkUsers.querySelector('#search').value;
//     const suggestUsernames = new SuggestUsernames(val);
//
//     let usernames = suggestUsernames.retrieveAll();
//
//     results.innerHTML = usernames.map(item => {
//     return `<div>
//                 ${item}
//             </div>`
//     }).join('');
//
//    console.log(suggestUsernames.retrieveSingle(1));
//    console.log(suggestUsernames.retrieveSingle(2));
//    console.log(suggestUsernames.retrieveSingle(3));

//});