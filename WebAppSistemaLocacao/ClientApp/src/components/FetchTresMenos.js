import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class FetchTresMenos extends Component {
    static displayName = FetchTresMenos.name;

    constructor(props) {
        super(props);
        this.state = { filmes: [], loading: true };
    }

    componentDidMount() {
        this.populaData();
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
                            </tr>
                        )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : FetchTresMenos.renderTabela(this.state.filmes);
        return (
            <div>
                <h1 id="tabelLabel">Tres filmes menos alugados da ultima semana</h1>
                {contents}

            </div>
        );
    }

    async populaData() {
        const response = await fetch('api/relatorio/tresmenosalugadosultimasemana');
        const data = await response.json();
        this.setState({ filmes: data, loading: false });
    }

}