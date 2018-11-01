import React, { Component, PropTypes } from 'react';
import { Note } from '../Model';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const WAIT_INTERVAL = 1000

class NoteBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	note: this.props.note,
        	expanded: false,
        	showVersions: false

        }
    }

    componentWillReceiveProps(nextProps) {
    	if (nextProps.note !== this.props.note) {
    		this.setState({
    			note: nextProps.note
    		})
    	}
    }

    titleChange(event) {
	    clearTimeout(this.titleTimer)
	    let prevIndex = this.state.note.id;
	    this.state.note.title = event.target.value;
	    this.setState({
	      note: this.state.note
	    })
	    this.titleTimer = setTimeout(this.triggerTitleChange.bind(this), WAIT_INTERVAL)
	}

	triggerTitleChange() {
		Note.updateTitle({
		  data:{
		    id:this.state.note.id,
		    title:this.state.note.title
		  },
		  onSuccess: function(data) {
		    NotificationManager.success(data.message);
		  }.bind(this),
		  onError: function(data) {

		  }
		})
	}

	deleteNote() {
      Note.deleteNote({
        data:{
          id: this.state.note.id
        },
        onSuccess: function(data) {
          this.props.onDelete(this.state.note.id);
          NotificationManager.warning(data.message);
        }.bind(this),
        onError: function(data) {

        }
      })
	}

	noteChange(event) {
	    clearTimeout(this.noteTimer)
	    this.state.note.notes = event.target.value;
	    this.setState({
	      note: this.state.note
	    })
	    this.noteTimer = setTimeout(this.triggerNoteChange.bind(this), WAIT_INTERVAL)
	}

	triggerNoteChange(){
	    Note.updateNote({
	      data:{
	        id:this.state.note.id,
	        notes:this.state.note.notes
	      },
	      onSuccess: function(data) {
	         NotificationManager.success(data.message);
	      }.bind(this),
	      onError: function(data) {

	      }
	    })
	}

	toggleExpandNote() {
	    this.setState({
	    	expanded: !this.state.expanded
	    })
	} 

	getSingleNoteData(data){
	    this.state.note.notes = data.notes;
	    this.setState({
	        note: this.state.note,
	      })
	  }


	renderSingleVersionBlock(data, index) {
		return(
		  <li key={index}><button type="button" className="btn btn-sm" onClick={this.getSingleNoteData.bind(this,data)}>{data.modified_date}</button></li>
		)
	}

  	renderVersionHistory() {
  		if (this.state.expanded && this.state.showVersions) {
	  		let { versionData } = this.state.note;
	  		versionData = versionData ? versionData : [];
		    return (
		    	<div className="version">
		          <h4 className="version-header">Version History</h4>
		          <ul>{versionData.map(this.renderSingleVersionBlock.bind(this))}</ul>
		        </div>
	    	)
		}
	}


	showVersions(index){
		this.setState({
			showVersions: true
		})
	    Note.getNoteVersions({
	      data:{
	        id:this.state.note.id,
	      },
	      onSuccess: function(data) {
	        let versionData = data.data
	        this.state.note.versionData = versionData
	        this.setState({
	          note: this.state.note,
	        })
	      }.bind(this),
	      onError: function(data) {

	      }
	    })
	}

    render() {
		let { note } = this.state;
		var buttonClass = this.state.expanded ? "input-button-full-width" : "input-button";
		var formClass = this.state.expanded ? "form-group-full-width" : "form-group";
		var inputClass = this.state.expanded ? "input-field-full-width" : "input-field";
		var buttonType = this.state.expanded ? "↙️" : "↗️";

        return(
	        <div className={formClass}>
	          <div className= "input-container">
	            <input type="text" className={inputClass} name="title" placeholder="Note Title" value={note.title} onChange={this.titleChange.bind(this)}/>
	            <button type="button" className={"btn btn-sm " + buttonClass} onClick={this.deleteNote.bind(this)}>❌</button>
	            <button type="button" className={"btn btn-sm " + buttonClass} onClick={this.toggleExpandNote.bind(this)}>{buttonType}</button>
	            <button type="button" className={"btn btn-sm " + buttonClass} onClick={this.showVersions.bind(this)}>🕒</button>
	          </div>
	          <div className="notebox">
	          	<textarea onChange={this.noteChange.bind(this)} className="form-control text-area" rows="10" value={note.notes}/>
	          	{this.renderVersionHistory()}
	          </div>
	        </div>
	      )
    }
}

export default NoteBlock;
