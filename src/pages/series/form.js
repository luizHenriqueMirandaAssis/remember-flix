import React, {Component} from 'react'
import {TextInput, Select, Table} from 'react-materialize'

class SeriesForm extends Component {
    constructor(props) {
        super(props);    
        
        this.state = {
            update: false,
            serie: {
              nome: '',
              categoriaId: 0
            },
            categorias: {},
            temporadas: {}
        }
    }

    componentDidMount() {
        const {match} = this.props
        const edit = (match.params.id === undefined) ? false: true

        this.setState({
            update: edit
        })
    }

    renderTitle (){
        const {update} = this.state;

        return update 
               ? "Editar"
               : "Cadastrar"    
    }

    renderTemporadas() {
        const {temporadas} = this.state
           
        return (
            <Table>
               <thead>
                   <tr>
                       <th>Id</th>
                       <th>Nome</th>
                   </tr>
               </thead>
               <tbody>
                   <tr>
                       <td>1</td>
                       <td>Naruto x Sasuke</td>
                   </tr>
               </tbody>
            </Table>
        )
    }

    renderCategorias() {
        const {categorias} = this.state

        return (
            <Select className="data-categoria" value={this.state.serie.categoriaId}>
                <option value="1">
                    Drama
                </option>
                <option value="2">
                    Anime       
                </option>
            </Select>
        )
    }

    isNome(className){
        return className === "data-nome";
    }

    isCategoria(className){
        return className === "data-categoria";
    }

    handleChange (event) {
       const className = event.target.className
       const value = event.target.value

       const nome = this.isNome(className) ? value : this.state.serie.nome
       const categoriaId = this.isCategoria(className) ? value:this.state.serie.categoriaId
        
        this.setState({
            serie : {
              nome,
              categoriaId
           }
        })      
    }
           
    render() {
     return (
         <div>
             <h1>{this.renderTitle()}</h1>
             <div>
                 <form onChange={(e)=> this.handleChange(e)}>
                    <div>
                        <TextInput className="data-nome" label="Nome" value={this.state.serie.nome} />
                        {this.renderCategorias()}
                    </div>

                    <div>
                        <span>Temporadas</span>
                        <button>Nova</button>

                        <div>
                            {this.renderTemporadas()}
                        </div>
                    </div>
                 </form>
             </div>
         </div>
     )
    }
}

export default SeriesForm