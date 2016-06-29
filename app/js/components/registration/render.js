const usernameValidations = document.getElementById('username-validations');
const usernameSuggestions = document.getElementById('username-suggestions');

export default {
    // dom manipulations go here. Verbose, to avoid innerHTML and XSS vulnerabilities
    validations (text) {
        const container = document.createElement('div');
        const span = document.createElement('span');
        span.innerText = text;
        container.appendChild(this.createIcon('exclamation-triangle', 'fa-2x'));
        container.appendChild(span);

        // prints validations
        usernameValidations.appendChild(container);
    },
    suggestions (username, items) {
        const container = document.createElement('div');
        container.className = 'clearfix';
        const span = document.createElement('span');
        const strong = document.createElement('strong');
        strong.innerText = username;
        const text = document.createTextNode(' is not available. How about one of these?');
        span.appendChild(strong);
        span.appendChild(text);
        container.appendChild(this.createIcon('exclamation-triangle', 'fa-2x'));
        container.appendChild(span);

        // prints suggestion headline
        usernameSuggestions.appendChild(container);

        let scontainer = document.createElement('ul');
        scontainer.className = "suggestions";
        scontainer.innerHTML = items.map(item => {
            return `<li class="suggestion" data-suggestion=${item}>${item}</li>`
        }).join('');
        container.appendChild(scontainer);

        // prints suggestions
        usernameSuggestions.appendChild(scontainer);

        // the following adds a listener to the suggestions, and adds them to the input onclick
        let suggestions = document.querySelector('.suggestions');
        let input = document.getElementById('chg-balloon-input');

        // listener is set on the UL, with delegation for the LIs
        suggestions.addEventListener('click', (e)=> {
            input.value = e.target.getAttribute('data-suggestion');
        });
    },
    success (username) {
        const container = document.createElement('div');
        const span = document.createElement('span');
        const strong = document.createElement('strong');
        strong.innerText = username;
        const text1 = document.createTextNode('Congrats! ');
        const text2 = document.createTextNode(' is available.');
        span.appendChild(text1);
        span.appendChild(strong);
        span.appendChild(text2);
        container.appendChild(this.createIcon('check-circle', 'fa-2x'));
        container.appendChild(span);

        // prints success msg
        usernameSuggestions.appendChild(container);
    },
    createIcon(icon, extra) {

        // returns desired font awesome formatted classes
        // two params, the icon name and any extra classes
        const i = document.createElement('i');
        i.className = `fa fa-${icon} ${extra}`;
        return i;
    },
    clearAll() {
        // ok to use evil innerHTML since no user input is passed
        usernameValidations.innerHTML = '';
        usernameSuggestions.innerHTML = '';
    }
};