class SendData {
    constructor(form, url, method) {
        this.form = document.querySelector(form);
        this.url = url;
        this.method = method;

        if (!this.form) {
            console.error('Form not found:', form);
            return;
        }

        this.form.addEventListener('submit', async(e) => {
            e.preventDefault();

            var isValid = true;

            if (isValid) {
                try {
                    const formData = new FormData(this.form);
                    const response = await fetch(this.url, {
                        method: this.method,
                        body: formData
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();
                    console.log(data);

                    if (data.url) {
                        window.location.href = data.url;
                    }
                    if (document.querySelector('h2') && data.username) {
                        document.querySelector('h2').innerHTML = `Hello ${data.username}`;
                    }



                } catch (error) {
                    console.error('Fetch Error:', error);
                }
            }
        });
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const signupButton = document.querySelector('#signup');
    const signinButton = document.querySelector('#signin');
    const logoutButton = document.querySelector('#logout');
    const updateButton = document.querySelector('#update');
    const modifyButton = document.querySelector('#modify');

    if (signupButton) {
        signupButton.addEventListener('click', () => {
            const signup = new SendData('form#signup', './api/signup.php', 'POST');
            signup;
        });
    }

    if (signinButton) {
        signinButton.addEventListener('click', () => {
            const signin = new SendData('form#signin', './api/signin.php', 'POST');
            signin;
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            const logout = new SendData('form#logout', './api/logout.php', 'POST');
            logout;
        });
    }

    if (updateButton) {
        updateButton.addEventListener('click', () => {
            const update = new SendData('form#update', './api/update.php', 'PUT');
            update;
        });
    }



});