import React, {Component} from 'react'
import Gateway from '../../lib/axios'
import { Table, TextInput } from 'react-materialize';

class List extends Component {

    //# (validate) Utilizar função retornando (true/false)
    //# (validate) Realizar validação mínimo 3 caracteres
    //# (filter)   tratamento não encontrado na listagem
    //# (Pull Request) -- Pontuação maior
    //# (Ou enviar arquivo por e-mail) -- Pontuação menor


    constructor () {
      super()

      this.state = {
        isLoading : true,
        source: {},
        data: {},
        filter: '',
        classValidate: 'validate valid',
        msgError: ''
      }
    }

   async componentDidMount() {
        const response = await Gateway.request("http://10.68.102.181:4000/series")

        this.setState({
            isLoading :false,
            data : response.data,
            source: response.data
        });
    }

     renderHtml () {
        const {isLoading, data} = this.state

        if(isLoading) 
         return (<div><span>Carregando...</span></div>)

        const rows = data.map((value) =>
            <tr key={value.id} >
                <td>
                    {value.id}
                </td>
                <td>
                    {value.descricao}
                </td>
                <td>
                {value.categoria}
                </td>
                <td>
                {value.temporadas}
                </td>   
            </tr>
        )

         return (
           <div>
            <h1>Lista de séries</h1>
            
            <div>
               <TextInput className={this.state.classValidate} error={this.state.msgError} value={this.state.filter} placeholder="Pesquisar" onChange={(e)=> this.change(e)} />
            </div>

            <Table>
                    <thead>
                        <tr>
                            <th data-field="id">
                                Id
                            </th>
                            <th data-field="name">
                                Nome
                            </th>
                            <th data-field="price">
                                Descrição
                            </th>
                            <th data-field="price">
                                Quantidade temporadas
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                         {rows}
                    </tbody>
                </Table>
           </div>
          )
       
    }

    change(event) {
       const value = event.target.value
     
       this.setState({
         filter:value
       })

       this.filter(value)
    }

    filter(value) {
        const {source} = this.state

        this.validate(value)

        const found = (value.trim() === '')
        ? source
        : source.filter(function(serie){
            return serie.descricao.toLowerCase().indexOf(value.toLowerCase()) !== -1
        })

        this.setState({
          data: found
       })
    }

    validate(value) {

      const success = "validate valid"
      const error = "validate invalid"
      let msgError = ""
      let classValidate = "" 

      if(value.trim() === '')
      {
        msgError = "Campo obrigatório"
        classValidate = error;
      }

      this.setState({
          classValidate,
          msgError
      })
    }

    render() {
        return  this.renderHtml()     
    }
}

export default List

