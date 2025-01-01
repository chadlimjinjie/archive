import Head from 'next/head';
import {Component} from 'react';

import Link from 'next/link';

export default class Layout extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <header className="mb-3">
          <nav className="navbar navbar-expand-lg navbar-dark nav-bg">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">Chad Lim</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <a className="nav-link" href="/">Home <i className="fas fa-home"></i></a>
                  <a className="nav-link" href="Register">Register <i className="fas fa-file-signature"></i></a>
                  <a className="nav-link" href="https://stats.uptimerobot.com/kOz7VunBNL" target="_blank">Stats <i className="far fa-chart-bar"></i></a>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </>
    );
  }

}