import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class FetchLocacao extends Component {
    static displayName = FetchLocacao.name;

    constructor(props) {
        super(props);
        this.state = { locacoes: [], loading: true };
    }

    componentDidMount() {
        this.populaData();
    }

    static handleEdit(id) {
        window.location.href = '/add-locacao-edit/' + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Você deseja deletar o Aluguel :" + id)) {
            return;
        }
        else {
            fetch('api/locacao?id=' + id, { method: 'DELETE' }).then(json => {
                window.location.href = "fetch-locacao";
                alert('Deletado com Sucesso!');
            });
        }
    }

    static renderTabela(locacoes) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Id Cliente</th>
                        <th>Id Filme</th>
                        <th>Data Locacao</th>
                        <th>Data Devolucao</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        locacoes.map(locacao =>
                            <tr key={locacao.id}>
                                <td>{locacao.id}</td>
                                <td>{locacao.id_Cliente}</td>
                                <td>{locacao.id_Filme}</td>
                                <td>{locacao.dataLocacao}</td>
                                <td>{locacao.dataDevolucao}</td>
                                <td>
                                    <button className="btn btn-success" onClick={(id) => this.handleEdit(locacao.id)}> Edit</button> &nbsp;
                                    <button className="btn btn-danger" onClick={(id) => this.handleDelete(locacao.id)}> Delete</button> &nbsp;
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
            : FetchLocacao.renderTabela(this.state.locacoes);
        return (
            <div>
                <h1 id="tabelLabel">Locacoes</h1>
                <p>
                    <Link to="/add-locacao">Cadastrar Aluguel</Link>
                </p>
                {contents}

            </div>
        );
    }

    async populaData() {
        const response = await fetch('api/locacao');
        const data = await response.json();
        this.setState({ locacoes: data, loading: false });
    }

}