import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Gateway from "../../lib/axios";
import { TextInput, Button, Modal } from "react-materialize";

class CategoriaForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      update: false,
      isLoading: false,
      messageOnSave: "",
      classValidate: "validate valid",
      msgError: "",
      data: {
        id: 0,
        descricao: ""
      }
    };
  }

  componentWillMount() {
    const { match } = this.props;
    let edit = false;
    let id = 0;

    if (match.params.id !== undefined) {
      edit = true;
      id = match.params.id;
    }

    this.setState({
      update: edit,
      id
    });
  }

  componentDidMount() {
    const { update, id } = this.state;

    if (update) {
      this.setState({
        isLoading: true
      });

      this.getById(id);
    }
  }

  async getById(id) {
    const response = await Gateway.request(
      `http://localhost:3000/categorias/${id}`
    );

    if (response.statusCode == 500) {
      this.setState({ update: false });
      this.props.history.push("/categorias/new");
    }

    this.setState({
      data: response.data,
      isLoading: false
    });
  }

  handleChange(event) {
    const { data } = this.state;
    data.descricao = event.target.value;

    this.setState({
      data
    });
  }

  async save(event) {
    event.preventDefault();

    const { update, data, id } = this.state;

    if (!data.descricao || data.descricao.length < 3) {
      this.validate(data.descricao);
      return;
    }

    const currentText = event.target.innerHTML;

    document.getElementById("btn-salvar").innerHTML = "Salvando";

    let response = null;
    let url = "http://localhost:3000/categorias/";

    if (update) {
      response = await Gateway.request(`${url}${id}`, "put", data);
    } else {
      response = await Gateway.request(url, "post", data);
    }

    this.setState({
      messageOnSave:
        response.statusCode !== 500 ? "Salvo com sucesso" : `${response.data}`
    });

    document.getElementById("btn-salvar").innerHTML = currentText;
  }

  validate(value) {
    const success = "validate valid";
    const error = "validate invalid";
    let msgError = "";
    let classValidate = "";

    if (value.trim() === "") {
      msgError = "Campo obrigatório";
      classValidate = error;
    } else if (value.length < 3) {
      msgError = "Minimo de 3 caracteres";
      classValidate = error;
    } else {
      classValidate = success;
      msgError = "";
    }

    this.setState({
      classValidate,
      msgError
    });
  }

  renderForm() {
    const { isLoading, data } = this.state;

    if (isLoading) {
      return (
        <div>
          <span>Carregando...</span>
        </div>
      );
    }

    return (
      <div>
        <form onChange={e => this.handleChange(e)}>
          <TextInput
            className={this.state.classValidate}
            error={this.state.msgError}
            id="descricao"
            label="Descrição"
            onChange={e => this.validate(e.target.value)}
            value={data.descricao}
            maxLength="60"
          ></TextInput>
          <Button id="btn-salvar" onClick={e => this.save(e)}>
            Salvar
          </Button>
          {this.state.messageOnSave && <p>{this.state.messageOnSave}</p>}
        </form>
      </div>
    );
  }

  renderTitle() {
    const { update } = this.state;
    return update ? "Editar" : "Cadastrar";
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        <div>{this.renderForm()}</div>
      </div>
    );
  }
}

export default CategoriaForm;
