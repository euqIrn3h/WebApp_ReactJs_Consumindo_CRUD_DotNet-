import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class FetchFilme extends Component {
    static displayName = FetchFilme.name;

    constructor(props) {
        super(props);
        this.state = { filmes: [], loading: true };
    }

    componentDidMount() {
        this.populaData();
    }

    static handleEdit(id) {
        window.location.href = '/add-filme-edit/' + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Você deseja deletar o Filme : " + id)) {
            return;
        }
        else {
            console.log("Ei");
            fetch('api/filme?id=' + id, {method: 'DELETE'}).then(json => {
                window.location.href = "fetch-filme";
                alert('Deletado com Sucesso!');
                console.log("Ei");
            });
        }
    }

    static renderTabela(filmes) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Título</th>
                        <th>Classificação Indicativa</th>
                        <th>Lançamento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filmes.map(filme =>
                            <tr key={filme.id}>
                                <td>{filme.id}</td>
                                <td>{filme.titulo}</td>
                                <td>{filme.classificacaoIndicativa}</td>
                                <td>{String(filme.lancamento)}</td>
                                <td>
                                    <button className="btn btn-success" onClick={(id) => this.handleEdit(filme.id)}> Edit</button> &nbsp;
                                    <button className="btn btn-danger" onClick={(id) => this.handleDelete(filme.id)}>Delete</button> &nbsp;
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
            : FetchFilme.renderTabela(this.state.filmes);
        return (
            <div>
                <h1 id="tabelLabel">Filmes</h1>
                <p>
                    <Link to="/add-filme">Cadastrar Filmes</Link>
                </p>
                {contents}
                
            </div>
        );
    }

    async populaData() {
        const response = await fetch('api/filme');
        const data = await response.json();
        this.setState({ filmes: data, loading: false});
    }

}