import React, { Component } from 'react'


export class AddLocacao extends Component {

    static displayName = AddLocacao.name;

    constructor(props) {
        super(props);

        this.state = { loading: false };
    }

    static async post(){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_cliente: this.props.match.params["idcliente"], idfilme: this.props.match.params["idfilme"],
                datalocacao: this.props.match.params["datalocacao"], datadevolucao: this.props.match.params["datadevolucao"]
            })
        };
        await fetch('api/locacao/' + this.state.id, requestOptions);

        window.location.href = 'fetch-locacao';
    }

    static renderCreateForm() {
        return (
            <form onSubmit={this.post}>
                <div className="form-group row">
                    <label>Id Cliente</label><br />
                    <input className="form-control" type="number" name="nome" required />
                </div>
                <div className="form-group row">
                    <label>Id Filme</label><br />
                    <input className="form-control" type="number" name="cpf" required />
                </div>
                <div className="form-group row">
                    <label>Data Locacao</label>
                    <input type="date" name="data" required />
                </div>
                <div className="form-group row">
                    <label>Data Devolucao</label>
                    <input type="date" name="data" />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success" onClick={this.put}>Salvar</button>

                </div>
            </form>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : AddLocacao.renderCreateForm();
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Locacao</h3>
                {contents}

            </div>
        );
    }

}