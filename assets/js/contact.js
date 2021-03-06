class Information {
    constructor(name, gender, phone, email, subject, message) {
        this.name = name;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }
}

class UI {
    static displayContact() {
        const contact = Store.getContact();
        contact.forEach((Contact) => UI.addContactToList(Contact));
    }

    static addContactToList(Contact) {
        const list = document.querySelector('#contact-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${Contact.name}</td>
        <td>${Contact.gender}</td>
        <td>${Contact.phone}</td>
        <td>${Contact.email}</td>
        <td>${Contact.subject}</td>
        <td>${Contact.message}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
        `;
        list.appendChild(row);
    }

    static deleteContact(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#my-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 5000);
    }

    static clearFields() {
        document.querySelector('#name').value = "";
        document.querySelector('#gender').value = "";
        document.querySelector('#phone').value = "";
        document.querySelector('#email').value = "";
        document.querySelector('#subject').value = "";
        document.querySelector('#message').value = "";
    }


}

class Store {
    static getContact() {
        let contact;
        if (localStorage.getItem(contact) === null) {
            contact = [];
        } else {
            contact = JSON.parse(localStorage.getItem('contact'));
        }
        return contact;
    }

    static addContact(contact) {
        const contactList = Store.getContact();
        contactList.push(contact);
        localStorage.setItem('contactList', JSON.stringify(contactList));
    }

    static removeContact(isbn) {
        const contactList = Store.getContact();

        contactList.forEach((contact, index) => {
            if (contact.isbn === isbn) {
                contactList.splice(index, 1);
            }
        });
        localStorage.setItem('contactList', JSON.stringify(contactList));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayContact);

document.querySelector('#my-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const gender = document.querySelector('#gender').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;
    const subject = document.querySelector('#subject').value;
    const message = document.querySelector('#message').value;

    if (name === "" || phone === "" || email === "" || subject === "" || message === "") {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {

        const contact = new Information(name, gender, phone, email, subject, message);
        UI.addContactToList(contact);
        Store.addContact(contact);
        UI.showAlert('Contact Added', 'success');
        UI.clearFields();
    }
});

document.querySelector('#contact-list').addEventListener('click', (e) => {
    UI.deleteContact(e.target);

    Store.removeContact(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Contact Removed', 'success');
});
