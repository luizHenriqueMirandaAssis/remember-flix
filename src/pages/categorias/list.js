import React, { Component } from "react";
import Gateway from "../../lib/axios";
import { Table, TextInput } from "react-materialize";
import { Link } from "react-router-dom";

class List extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      source: {},
      data: {},
      filter: "",
      classValidate: "validate valid",
      msgError: ""
    };
  }

  async componentDidMount() {
    const response = await Gateway.request("http://localhost:3000/categorias");

    this.setState({
      isLoading: false,
      data: response.data,
      source: response.data
    });
  }

  renderHtml() {
    const { isLoading, data } = this.state;

    if (isLoading)
      return (
        <div>
          <span>Carregando...</span>
        </div>
      );

    const rows = data.map(value => (
      <tr key={value.id}>
        <td>{value.id}</td>
        <td>{value.descricao}</td>
      </tr>
    ));

    return (
      <div>
        <h1>Lista de categorias</h1>

        <div>
          <TextInput
            className={this.state.classValidate}
            error={this.state.msgError}
            value={this.state.filter}
            placeholder="Pesquisar"
            onChange={e => this.change(e)}
          />
          <Link to={"/categorias/new"}> Nova </Link>
        </div>

        <Table>
          <thead>
            <tr>
              <th data-field="id">Id</th>
              <th data-field="price">Descrição</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    );
  }

  change(event) {
    const value = event.target.value;

    this.setState({
      filter: value
    });

    this.filter(value);
  }

  filter(value) {
    const { source } = this.state;

    this.validate(value);

    const found =
      value.trim() === ""
        ? source
        : source.filter(function(categoria) {
            return (
              categoria.descricao.toLowerCase().indexOf(value.toLowerCase()) !==
              -1
            );
          });

    this.setState({
      data: found
    });
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

  render() {
    return this.renderHtml();
  }
}

export default List;
