import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Gestao extends Component {
    static displayName = Gestao.name;

    render() {
        return (
          
            <div>
                <Link to="fetch-cliente"><h5> Clientes </h5></Link>

                <Link to="fetch-filme"><h5> Filmes </h5></Link>

                <Link to="fetch-locacao"><h5> Locacoes </h5></Link>
            </div>
 
        );
    }
}