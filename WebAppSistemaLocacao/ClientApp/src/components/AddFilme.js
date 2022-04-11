import React, { Component } from 'react'


export class AddFilme extends Component {

    static displayName = AddFilme.name;

    constructor(props) {
        super(props);

        this.state = { loading: false };
    }

    static async post() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: this.props.match.params["titulo"], classificacaoIndicativa: this.props.match.params["classificacao"], lancamento: this.props.match.params["lancamento"] })
        };
        await fetch('api/filme/', requestOptions);

        window.location.href = 'fetch-filme';
    }

    static renderCreateForm() {
        return (
            <form onSubmit={this.post}>
                <div className="form-group row">
                    <label>Título</label><br />
                    <input className="form-control" type="text" name="titulo" required />
                </div>
                <div className="form-group row">
                        <label>Classificacao Indicativa</label><br />
                        <input className="form-control" type="number" name="classificacao" required />
                </div>
                <div className="form-group row">
                        <label>Lancamento</label>
                        <input type="checkbox" name="lancamento" />
                </div>
                    <button type="submit" className="btn btn-success">Salvar</button>
            </form>
            );
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : AddFilme.renderCreateForm();
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Filme</h3>
                {contents}

            </div>
        );
    }

}