import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    display: 'block'
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

const speakers = [
  {
    value: 1,
    label: 'speaker 1'
  },
  {
    value: 2,
    label: 'speaker 2'
  }
];

class NewDialogueForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogues: this.props.dialogues,
      speaker: 1,
      text: '',
      prompt: '',
      helperFirst: '',
      helperTarget: ''
    };
    this.addMoreFields = this.addMoreFields.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  addMoreFields() {
    const newField = {
      id: 'dialogue03',
      parts: []
    };

    const part = {
      text: this.state.text,
      speaker: this.state.speaker,
      prompt: this.state.prompt,
      helperFirst: this.state.helperFirst,
      helperTarget: this.state.helperTarget
    };
    newField.parts.push(part);
    //const joined = this.state.dialogues.concat(newField);
    //this.setState({ dialogues: joined });
    //console.log(this.state.dialogues);
    console.log(newField.parts);
    this.setState({
      id: '',
      text: '',
      speaker: '',
      prompt: '',
      helperFirst: '',
      helperTarget: ''
    });
  }

  render() {
    const { classes } = this.props;
    //console.log(this.state.dialogues);
    return (
      <div>
        <h1>New Dialogue Form</h1>

        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="filled-select-speakers"
            select
            label="Select"
            className={classes.textField}
            value={this.state.speaker}
            onChange={this.handleChange('speaker')}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Please select a speaker"
            margin="normal"
            variant="filled"
          >
            {speakers.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="text"
            label="Text"
            className={classes.textField}
            value={this.state.text}
            onChange={this.handleChange('text')}
            margin="normal"
          />
          <TextField
            id="prompt"
            label="Prompt"
            className={classes.textField}
            value={this.state.prompt}
            onChange={this.handleChange('prompt')}
            margin="normal"
          />
          <TextField
            id="helperFirst"
            label="Helper first"
            className={classes.textField}
            value={this.state.helperFirst}
            onChange={this.handleChange('helperFirst')}
            margin="normal"
          />
          <TextField
            id="helperTarget"
            label="Helper target"
            className={classes.textField}
            value={this.state.helperTarget}
            onChange={this.handleChange('helperTarget')}
            margin="normal"
          />
        </form>
        <Fab color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon onClick={this.addMoreFields} />
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(NewDialogueForm);
