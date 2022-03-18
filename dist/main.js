"use strict";
const form = document.querySelector('form');
const input = form.querySelector('[data-input]');
const notesWrapper = document.querySelector('.columns');
const errorMessage = document.querySelector('[data-error]');
const emptyBanner = document.querySelector('[data-empty]');
const emptyNotesMessage = emptyBanner.querySelector('[data-empty-text]');
const searchInput = document.querySelector('[data-search]');
const clearAllBtn = document.querySelector('[data-clear]');
let notes = [];
form === null || form === void 0 ? void 0 : form.addEventListener('submit', handleSubmit);
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('input', filterNotes);
notesWrapper === null || notesWrapper === void 0 ? void 0 : notesWrapper.addEventListener('click', deleteNote);
clearAllBtn === null || clearAllBtn === void 0 ? void 0 : clearAllBtn.addEventListener('click', clearAllNotes);
loadNotes();
function handleSubmit(e) {
    e.preventDefault();
    errorMessage.textContent = '';
    input === null || input === void 0 ? void 0 : input.classList.remove('is-danger');
    const { note } = e.target.elements;
    if (!note.value.trim()) {
        errorMessage.textContent = 'The input cannot be empty';
        input === null || input === void 0 ? void 0 : input.classList.add('is-danger');
        return;
    }
    addNote(note.value);
    form === null || form === void 0 ? void 0 : form.reset();
    input.focus();
}
function loadNotes() {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    storedNotes.forEach(note => addNote(note));
    emptyBanner === null || emptyBanner === void 0 ? void 0 : emptyBanner.classList.add('is-hidden');
    clearAllBtn === null || clearAllBtn === void 0 ? void 0 : clearAllBtn.classList.remove('is-hidden');
    if (!(notesWrapper === null || notesWrapper === void 0 ? void 0 : notesWrapper.childElementCount)) {
        changeBannerTextAndButtonVisibility();
    }
}
function addNote(value) {
    notes.push(value);
    localStorage.setItem('notes', JSON.stringify(notes));
    emptyBanner === null || emptyBanner === void 0 ? void 0 : emptyBanner.classList.add('is-hidden');
    clearAllBtn === null || clearAllBtn === void 0 ? void 0 : clearAllBtn.classList.remove('is-hidden');
    notesWrapper.innerHTML += `
		<div class="column is-one-third" data-note>
			<div class="tile">
				<article class="tile is-child notification is-primary">
					<p class="title">Note</p>
					<p class="subtitle">${value}</p>
					<button class="delete is-medium"></button>
				</article>
			</div>
		</div>
	`;
}
function deleteNote(e) {
    var _a;
    const { parentElement, previousElementSibling } = e.target;
    if (!e.target.classList.contains('delete'))
        return;
    const noteIndex = notes.indexOf(previousElementSibling === null || previousElementSibling === void 0 ? void 0 : previousElementSibling.textContent);
    notes.splice(noteIndex, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    (_a = parentElement === null || parentElement === void 0 ? void 0 : parentElement.closest('.column.is-one-third')) === null || _a === void 0 ? void 0 : _a.remove();
    if (!(notesWrapper === null || notesWrapper === void 0 ? void 0 : notesWrapper.childElementCount)) {
        changeBannerTextAndButtonVisibility("You don't have any notes yet");
    }
}
function filterNotes(e) {
    const searchValue = e.target.value.toLowerCase();
    const notes = notesWrapper.querySelectorAll('[data-note]');
    notes === null || notes === void 0 ? void 0 : notes.forEach(note => {
        var _a, _b;
        const noteContent = (_b = (_a = note
            .querySelector('.subtitle')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        const hiddenNotes = document.querySelectorAll('.column.is-hidden');
        emptyBanner === null || emptyBanner === void 0 ? void 0 : emptyBanner.classList.add('is-hidden');
        note.classList.remove('is-hidden');
        if (!(noteContent === null || noteContent === void 0 ? void 0 : noteContent.includes(searchValue.trim()))) {
            note.classList.add('is-hidden');
        }
        if ((hiddenNotes === null || hiddenNotes === void 0 ? void 0 : hiddenNotes.length) == (notesWrapper === null || notesWrapper === void 0 ? void 0 : notesWrapper.childElementCount)) {
            emptyBanner === null || emptyBanner === void 0 ? void 0 : emptyBanner.classList.remove('is-hidden');
            emptyNotesMessage.textContent = `No results for ${searchValue}`;
        }
    });
}
function clearAllNotes() {
    notesWrapper === null || notesWrapper === void 0 ? void 0 : notesWrapper.replaceChildren();
    localStorage.removeItem('notes');
    changeBannerTextAndButtonVisibility("You don't have any notes yet");
    searchInput.value = '';
}
function changeBannerTextAndButtonVisibility(message = emptyNotesMessage === null || emptyNotesMessage === void 0 ? void 0 : emptyNotesMessage.textContent) {
    clearAllBtn === null || clearAllBtn === void 0 ? void 0 : clearAllBtn.classList.add('is-hidden');
    emptyBanner === null || emptyBanner === void 0 ? void 0 : emptyBanner.classList.remove('is-hidden');
    emptyNotesMessage.textContent = message;
}
//# sourceMappingURL=main.js.map