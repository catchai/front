import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTask, deleteTask } from "../actions/tasks";
import TaskDataService from "../services/tasks.service";

class Task extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTask = this.getTask.bind(this);
    this.removeTask = this.removeTask.bind(this);

    this.state = {
      currentTask: {
        id: null,
        description: "",
        fechaVigencia: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getTask(this.props.match.params.id);
  }

  

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentTask: {
        ...prevState.currentTask,
        description: description,
      },
    }));
  }

  onChangeStatus(e) {
    const fechaVigencia = e.target.value;

    this.setState((prevState) => ({
      currentTask: {
        ...prevState.currentTask,
        fechaVigencia: fechaVigencia,
      },
    }));
  }


  updateStatus(st) {
    const status = st;

    this.setState((prevState) => ({
      currentTask: {
        ...prevState.currentTask,
        status: status,
      },
    }));
  }

  getTask(id) {
    TaskDataService.get(id)
      .then((response) => {
        this.setState({
          currentTask: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
 
 

  removeTask() {
    this.props
      .deleteTask(this.state.currentTask.id)
      .then(() => {
        this.props.history.push("/tasks");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentTask } = this.state;

    return (
      <div>
        {currentTask ? (
          <div className="edit-form">
            <h4>Tarea</h4>
            <form>
              <div className="form-group">
                <label htmlFor="description">Descripcion</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTask.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fechaVigencia">Fecha Vigencia</label>
                <input
                  type="text"
                  className="form-control"
                  id="fechaVigencia"
                  value={currentTask.fechaVigencia}
                  onChange={this.onChangeFechaVigencia}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTask.vigente ? "Activo" : "Desactivado"}
              </div>
            </form>

            {currentTask.vigente ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                Desactivar
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Activar
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeTask}
            >
              Eliminar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Actualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Favor haxcer click sobre la tarea...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateTask, deleteTask })(Task);
