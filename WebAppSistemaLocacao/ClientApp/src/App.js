import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Gestao } from './components/Gestao';
import { Relatorios } from './components/Relatorios';
import { FetchFilme } from './components/FetchFilme';
import { FetchCliente } from './components/FetchCliente';
import { FetchLocacao } from './components/FetchLocacao';
import { FetchCincoFilmes } from './components/FetchCincoFilmes';
import { FetchClienteAtrasado } from './components/FetchClienteAtrasado';
import { FetchFilmesNuncaAlugados } from './components/FetchFilmesNuncaAlugados';
import { FetchSegundoCliente } from './components/FetchSegundoCliente';
import { FetchTresMenos } from './components/FetchTresMenos';
import { AddFilme } from './components/AddFilme';
import { AddCliente } from './components/AddCliente';
import { AddLocacao } from './components/AddLocacao';
import { AddFilmeEdit } from './components/AddFilmeEdit';
import { AddClienteEdit } from './components/AddClienteEdit';
import { AddLocacaoEdit } from './components/AddLocacaoEdit';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/gestao' component={Gestao} />
            <Route path='/relatorios' component={Relatorios} />
            <Route path='/fetch-filme' component={FetchFilme} />
            <Route path='/fetch-cliente' component={FetchCliente} />
            <Route path='/fetch-locacao' component={FetchLocacao} />
            <Route path='/add-filme' component={AddFilme} />
            <Route path='/add-cliente' component={AddCliente} />
            <Route path='/add-locacao' component={AddLocacao} />
            <Route path='/add-filme-edit' component={AddFilmeEdit} />
            <Route path='/add-cliente-edit' component={AddClienteEdit} />
            <Route path='/add-locacao-edit' component={AddLocacaoEdit} />
            <Route path='/fetch-cinco-filmes' component={FetchCincoFilmes} />
            <Route path='/fetch-cliente-atrasado' component={FetchClienteAtrasado} />
            <Route path='/fetch-filmes-nunca-alugados' component={FetchFilmesNuncaAlugados} />
            <Route path='/fetch-segundo-cliente' component={FetchSegundoCliente} />
            <Route path='/fetch-tres-menos' component={FetchTresMenos} />

      </Layout>
    );
  }
}
