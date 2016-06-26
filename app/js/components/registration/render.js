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

        usernameSuggestions.appendChild(container);

        let scontainer = document.createElement('ul');
        scontainer.className = "suggestions";
        // cheating here with innerHTML due to time constraints!
        scontainer.innerHTML = items.map(item => {
            return `<li class="suggestion" data-suggestion=${item}>${item}</li>`
        }).join('');
        container.appendChild(scontainer);

        usernameSuggestions.appendChild(scontainer);
        
        let suggestions = document.querySelector('.suggestions');
        let input = document.getElementById('chg-balloon-input');

        suggestions.addEventListener('click', (e)=> {
            console.log('click');
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
        usernameSuggestions.appendChild(container);
    },
    createIcon(icon, extra) {
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