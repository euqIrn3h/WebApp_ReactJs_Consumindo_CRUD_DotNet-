import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class FetchSegundoCliente extends Component {
    static displayName = FetchSegundoCliente.name;

    constructor(props) {
        super(props);
        this.state = { clientes: [], loading: true };
    }

    componentDidMount() {
        this.populaData();
    }


    static renderTabela(cliente) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Data Nascimento</th>
                    </tr>
                </thead>
                <tbody>  
                    <tr key={cliente.id}>
                        <td>{cliente.id}</td>
                        <td>{cliente.nome}</td>
                        <td>{cliente.cpf}</td>
                        <td>{cliente.dataNascimento}</td>
                    </tr>
                   
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : FetchSegundoCliente.renderTabela(this.state.clientes);
        return (
            <div>
                <h1 id="tabelLabel">Segundo Cliente que mais alugou filmes</h1>
                {contents}
            </div>
        );
    }

    async populaData() {
        const response = await fetch('api/relatorio/osegundoclientequemaisalugou');
        const data = await response.json();
        this.setState({ clientes: data, loading: false });
    }

}