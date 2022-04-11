import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Relatorios extends Component {
    static displayName = Relatorios.name;

    render() {
        return (

            <div>
                <Link to="fetch-cliente-atrasado"><h5> Clientes em Atraso</h5></Link>

                <Link to="fetch-filmes-nunca-alugados"><h5> Filmes nunca alugados</h5></Link>

                <Link to="fetch-cinco-filmes"><h5> Cinco filmes mais alugados do ultimo ano </h5></Link>

                <Link to="fetch-tres-menos"><h5> Tres menos alugados da ultima semana </h5></Link>

                <Link to="fetch-segundo-cliente"><h5> Segundo cliente que mais alugou filmes </h5></Link>
            </div>

        );
    }
}