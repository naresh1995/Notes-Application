import {Routes, Api} from '../Config';

function fetchNotes(options) {
	let { onSuccess, onError } = options;
	Api.get(Routes.fetchNotes())
     .then(function(data){
     	onSuccess(data);
     }).catch((error) =>{
        onError(error);
     })	
}

function addNewNote(options) {
	let { onSuccess, onError } = options;
	Api.get(Routes.addNewNote())
     .then(function(data){
     	onSuccess(data);
     }).catch((error) =>{
        onError(error);
     })	
}

function deleteNote(options) {
	let { data, onSuccess, onError } = options;
	Api.post(Routes.deleteNote(), data)
     .then(function(data){
     	onSuccess(data);
     }).catch((error) =>{
        onError(error);
     })	
}

function updateNote(options) {
	let { data, onSuccess, onError } = options;
	Api.post(Routes.updateNote(), data)
     .then(function(data){
     	onSuccess(data);
     }).catch((error) =>{
        onError(error);
     })	
}

function updateTitle(options) {
	let { data, onSuccess, onError } = options;
	Api.post(Routes.updateTitle(), data)
     .then(function(data){
		onSuccess(data);
     }).catch((error) =>{
        onError(error);
     })	
}

function getNoteVersions(options) {
	let { data, onSuccess, onError } = options;
	Api.post(Routes.getNoteVersions(), data)
     .then(function(data){
     	onSuccess(data);
     }).catch((error) =>{
        onError(error);
     })	
}

export {
	fetchNotes, addNewNote, deleteNote, updateNote, updateTitle, getNoteVersions
 }    
