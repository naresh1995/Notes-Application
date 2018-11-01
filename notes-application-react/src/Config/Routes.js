function baseURl () {
	return "http://127.0.0.1:8000/task";
}

function fetchNotes() {
	return baseURl() + '/get_all_note';
}

function addNewNote(){
	return baseURl() + '/create_note';
}

function deleteNote() {
	return baseURl() + '/delete_note';
}

function updateNote(){
	return baseURl() + '/update_note';
} 

function updateTitle(){
	return baseURl() + '/update_title';
}

function getNoteVersions() {
	return baseURl() + '/get_all_version';
}

export {
	fetchNotes, addNewNote, deleteNote, updateNote, updateTitle, getNoteVersions
}