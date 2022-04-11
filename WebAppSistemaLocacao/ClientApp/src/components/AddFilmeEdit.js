import React, { Component } from 'react'


export class AddFilmeEdit extends Component {
    static displayName = AddFilmeEdit.name;

    constructor(props) {
        super(props)

        this.state = { id: this.props.match.params["id"], loading: false };
    }

    static async put() {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: this.props.match.params["titulo"], classificacaoIndicativa: this.props.match.params["classificacao"], lancamento: this.props.match.params["lancamento"] })
        };
        await fetch('api/filme/' + this.state.id, requestOptions);

        window.location.href = 'fetch-filme';
    }

    static renderCreateForm() {
        return (
            <form onSubmit={this.put}>
                <div>
                    <label>Título</label><br/>
                    <input className="form-control" type="text" name="titulo" required />
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label>Classificacao Indicativa</label><br />
                        <input className="form-control" type="number" name="classificacao"required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label>Lancamento</label>
                        <input type="checkbox" name="lancamento"/>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success"  >Salvar</button>

                </div>
            </form>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : AddFilmeEdit.renderCreateForm();
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Filme</h3>
                {contents}

            </div>
        );
    }
}