import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class FetchCliente extends Component {
    static displayName = FetchCliente.name;

    constructor(props) {
        super(props);
        this.state = { clientes: [], loading: true };
    }

    componentDidMount() {
        this.populaData();
    }

    static handleEdit(id) {
        window.location.href = '/add-cliente-edit/' + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Você deseja deletar o Cliente :" + id)) {
            return;
        }
        else {
            fetch('api/cliente?id=' + id, { method: 'DELETE' }).then(json => {
                window.location.href = "fetch-cliente";
                alert('Deletado com Sucesso!');
            });
        }
    }

    static renderTabela(clientes) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Data Nascimento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientes.map(cliente =>
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.cpf}</td>
                                <td>{cliente.dataNascimento}</td>
                                <td>
                                    <button className="btn btn-success" onClick={(id) => this.handleEdit(cliente.id)}> Edit</button> &nbsp;
                                    <button className="btn btn-danger" onClick={(id) => this.handleDelete(cliente.id)}> Delete</button> &nbsp;
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : FetchCliente.renderTabela(this.state.clientes);
        return (
            <div>
                <h1 id="tabelLabel">Clientes</h1>
                <p>
                    <Link to="/add-cliente">Cadastrar Cliente</Link>
                </p>
                {contents}

            </div>
        );
    }

    async populaData() {
        const response = await fetch('api/cliente');
        const data = await response.json();
        this.setState({ clientes: data, loading: false });
    }

}