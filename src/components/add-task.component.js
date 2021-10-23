import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask } from "../actions/tasks";


/**
 * 
 * Alejandro Sandoval Alias Joker
 * 
 * Agregacion Task 
 * 
 */
class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  saveTask() {
    const { title, description } = this.state;

    this.props
      .createTask(title, description)
      .then((data) => {
        this.setState({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newTask() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTask}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripcion</label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                required
                value={this.state.descripcion}
                onChange={this.onChangeDescription}
                name="descripcion"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fechaCreacion">Fecha</label>
              <input
                type="text"
                className="form-control"
                id="fechaCreacion"
                required
                value={this.state.fechaCreacion}
                onChange={this.onChangeFechaCreacion}
                name="fechaCreacion"
              />
            </div>

            <div className="form-group">
              <label htmlFor="vigente">Vigente</label>
              <input
                type="boolean"
                className="form-control"
                id="vigente"
                required
                value={this.state.vigente}
                onChange={this.onChangeFechaCreacion}
                name="vigente"
              />
            </div>

            <button onClick={this.saveTask} className="btn btn-success">
              Guardar
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createTask })(AddTask);
