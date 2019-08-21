import React, {Component} from 'react'
import Gateway from '../../lib/axios'
import { Table } from 'react-materialize';

class List extends Component {

    constructor () {
      super()

      this.state = {
        isLoading : true,
        data: {}
      }
    }

   async componentDidMount() {
        const response = await Gateway.request("http://10.68.102.35:4000/series")

        this.setState({
            isLoading :false,
            data : response.data
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

    render() {
        return  this.renderHtml()
        
    }
}

export default List

