import React, { Component } from 'react';
import './App.css';
import { Note } from './Model';
import NoteBlock from './Components/NoteBlock';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css';
import 'react-notifications/dist/react-notifications.css';
import 'react-notifications/dist/react-notifications.js';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      noteDataFromServer: [],
      expandIndex: -1
    };
  }

  titleTimer = null
  noteTimer = null

  //Data fetch from server
  componentWillMount() {
    Note.fetchNotes({
      onSuccess: function(data) {
        this.setState({
          noteDataFromServer: data.data,
          loading: false
        })
      }.bind(this),
      onError: function(data) {

      }
    })
  }

  addNewNote(previousExpandIndex){
    var sample =  [{title: "", notes: "", expand: false }];
    if(previousExpandIndex != -1){
      this.minimizeNote(previousExpandIndex);
    }
    this.setState({
      noteDataFromServer :this.state.noteDataFromServer,
      noteDataFromServer: sample.concat(this.state.noteDataFromServer)
    })
    Note.addNewNote({
      onSuccess: function(data) {
        this.state.noteDataFromServer[0].id = data.id;
        this.setState({
          noteDataFromServer: this.state.noteDataFromServer
        })
      }.bind(this),
      onError: function(data) {

      }
    })
  }

  deleteNote = (id) => {
    let { noteDataFromServer } = this.state;
    let idx = this.getIndexById(id, noteDataFromServer);
    if (idx > -1) {
      noteDataFromServer.splice(idx, 1);
      this.setState({
        noteDataFromServer: noteDataFromServer
      })
    }
  }

  getIndexById = (id, array) => {
    for (var i = array.length - 1; i >= 0; i--) {
      if (array[i].id === id)
        return i
    }
    return -1;
  }
  
  renderNote = (note, index) => {
    return <NoteBlock note={note} key={index} onDelete={this.deleteNote}/> 
  }

  render() {
    if(this.state.loading) {
      return (
        <div className="App">
          <p>loading....</p>
        </div>
      )
    } else {
      return (
        <div className="App">
            <div className="d-flex p-3 bg-secondary text-white m-2">  
              <button type="button" className="btn btn-primary btn-sm" onClick={this.addNewNote.bind(this,this.state.expandIndex)}>Add New Note</button>
            </div>
            <div className="row">
              {this.state.noteDataFromServer.map(this.renderNote.bind(this))}
            </div> 
            <NotificationContainer/>
        </div>
      );  
    }
  }
}

export default App;
