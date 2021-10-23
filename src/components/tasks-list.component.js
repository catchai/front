import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveTasks,
  findTasksByDescription,
  deleteAllTasks,
} from "../actions/tasks";
import { Link } from "react-router-dom";

class TasksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchDescription = this.onChangeSearchDescription.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.findTaskyDescription = this.findTaskByDescription.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);

    this.state = {
      currentTask: null,
      currentIndex: -1,
      searchDescription: "",
    };
  }

  componentDidMount() {
    this.props.retrieveTasks();
  }

  onChangeSearchDescription(e) {
    const searchDescription = e.target.value;

    this.setState({
      searchDescription: searchDescription,
    });
  }

  refreshData() {
    this.setState({
      currentTask: null,
      currentIndex: -1,
    });
  }

  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: index,
    });
  }

  removeAllTasks() {
    this.props
      .deleteAllTasks()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findTaskByDescription() {
    this.refreshData();

    this.props.findTasksByDescription(this.state.searchDescription);
  }

  render() {
    const { searchDescription, currentTask, currentIndex } = this.state;
    const { tasks } = this.props;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Búsqueda por Descripción"
              value={searchDescription}
              onChange={this.onChangeSearchDescription}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByDescription}
              >
                Búsqueda
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Listado de Tareas</h4>

          <ul className="list-group">
            {tasks &&
              tasks.map((task, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTask(task, index)}
                  key={index}
                >
                  {task.descripcion}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTasks}
          >
            Eliminar Todo
          </button>
        </div>
        <div className="col-md-6">
          {currentTask ? (
            <div>
              <h4>Tarea</h4>
              <div>
                <label>
                  <strong>Descripcion:</strong>
                </label>{" "}
                {currentTask.descripcion}
              </div>
              <div>
                <label>
                  <strong>Creacion:</strong>
                </label>{" "}
                {currentTask.fechaCreacion}
              </div>
              <div>
                <label>
                  <strong>Vigencia:</strong>
                </label>{" "}
                {currentTask.vigente ? "Activa" : "No"}
              </div>

              <Link
                to={"/tasks/" + currentTask.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Favor hace Click sobre alguna tarea...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

export default connect(mapStateToProps, {
  retrieveTasks,
  findTasksByDescription,
  deleteAllTasks,
})(TasksList);
