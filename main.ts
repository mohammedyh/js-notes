const form = document.querySelector('form');
const input = form!.querySelector('[data-input]') as HTMLInputElement;
const notesWrapper = document.querySelector('.columns');
const errorMessage = document.querySelector('[data-error]');
const emptyBanner = document.querySelector('[data-empty]');
const emptyNotesMessage = emptyBanner!.querySelector('[data-empty-text]');
const searchInput = document.querySelector('[data-search]');
const clearAllBtn = document.querySelector('[data-clear]');

let notes: string[] = [];

form?.addEventListener('submit', handleSubmit);
searchInput?.addEventListener('keyup', filterNotes);
notesWrapper?.addEventListener('click', deleteNote);
clearAllBtn?.addEventListener('click', clearAllNotes);

loadNotes();

function handleSubmit(e: SubmitEvent): void {
	e.preventDefault();

	errorMessage!.textContent = '';
	input?.classList.remove('is-danger');

	const { note }: any = (e.target as HTMLFormElement).elements;

	if (!note.value.trim()) {
		errorMessage!.textContent = 'The input cannot be empty';
		input?.classList.add('is-danger');
		return;
	}

	addNote(note.value);

	form?.reset();
	input!.focus();
}

function loadNotes(): void {
	const storedNotes: string[] =
		JSON.parse(localStorage.getItem('notes') as string) || [];
	storedNotes.forEach(note => addNote(note));

	emptyBanner?.classList.add('is-hidden');
	clearAllBtn?.classList.remove('is-hidden');

	if (!notesWrapper?.childElementCount) {
		changeBannerTextAndButtonVisibility();
	}
}

function addNote(value: string): void {
	notes.push(value);
	localStorage.setItem('notes', JSON.stringify(notes));

	emptyBanner?.classList.add('is-hidden');
	clearAllBtn?.classList.remove('is-hidden');

	notesWrapper!.innerHTML += `
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

function deleteNote(e: Event) {
	const { parentElement, previousElementSibling } =
		e.target as HTMLButtonElement;
	if (!(e.target as HTMLButtonElement).classList.contains('delete')) return;

	const noteIndex = notes.indexOf(
		previousElementSibling?.textContent as string
	);

	notes.splice(noteIndex, 1);
	localStorage.setItem('notes', JSON.stringify(notes));
	parentElement?.closest('.column.is-one-third')?.remove();

	if (!notesWrapper?.childElementCount) {
		changeBannerTextAndButtonVisibility("You don't have any notes yet");
	}
}

function filterNotes(e: Event): void {
	const searchValue = (e.target as HTMLInputElement).value.toLowerCase();
	const notes = notesWrapper!.querySelectorAll('[data-note]');

	notes?.forEach(note => {
		const noteContent = note
			.querySelector('.subtitle')
			?.textContent?.toLowerCase();
		const hiddenNotes = document.querySelectorAll('.column.is-hidden');

		emptyBanner?.classList.add('is-hidden');
		note.classList.remove('is-hidden');
		// @ts-ignore
		if (!noteContent?.includes(searchValue.trim())) {
			note.classList.add('is-hidden');
		}

		if (hiddenNotes?.length == notesWrapper?.childElementCount) {
			emptyBanner?.classList.remove('is-hidden');
			emptyNotesMessage!.textContent = `No results for ${searchValue}`;
		}
	});
}

function clearAllNotes() {
	notesWrapper?.replaceChildren();
	localStorage.removeItem('notes');
	changeBannerTextAndButtonVisibility("You don't have any notes yet");
	(searchInput as HTMLInputElement).value = '';
}

function changeBannerTextAndButtonVisibility(
	message: string = emptyNotesMessage?.textContent as string
): void {
	clearAllBtn?.classList.add('is-hidden');
	emptyBanner?.classList.remove('is-hidden');
	emptyNotesMessage!.textContent = message;
}
