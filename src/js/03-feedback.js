import throttle from 'lodash.throttle';

const formData = {};
const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('.feedback-form input');
const inputMessage = document.querySelector('.feedback-form textarea');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function onFormInput() {
  formData.email = inputEmail.value;
  formData.message = inputMessage.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedSettings = localStorage.getItem(STORAGE_KEY);
  if (savedSettings) {
    const parsedSettings = JSON.parse(savedSettings);
    inputEmail.value = parsedSettings.email;
    inputMessage.value = parsedSettings.message;
  }
}
