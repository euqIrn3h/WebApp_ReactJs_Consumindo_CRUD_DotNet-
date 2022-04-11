import React, { Component } from 'react'


export class AddCliente extends Component {

    static displayName = AddCliente.name;

    constructor(props) {
        super(props);

        this.state = { loading: false };
    }

    static async post() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: this.props.match.params["nome"], cpf: this.props.match.params["cpf"], datanascimento: this.props.match.params["data"] })
        };
        await fetch('api/cliente/' + this.state.id, requestOptions);

        window.location.href = 'fetch-cliente';
    }

    static renderCreateForm() {
        return (
            <form onSubmit={this.post}>
                <div>
                    <label>Nome</label><br />
                    <input className="form-control" type="text" name="nome" required />
                </div>
                <div className="form-group row">
                    <label>CPF</label><br />
                    <input className="form-control" type="number" name="cpf" required />
                </div>
                <div className="form-group row">
                    <label>Data nascimento</label>
                    <input type="date" name="data" required />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success" >Salvar</button>

                </div>
            </form>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : AddCliente.renderCreateForm();
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Cliente</h3>
                {contents}

            </div>
        );
    }

}