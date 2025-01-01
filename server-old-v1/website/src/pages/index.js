import {Component} from 'react';

import Layout from '../components/Layout';

export default class Index extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Layout title="Home" />
        <main>
          <div className="container">
            <p>Hello World! Written using Next.js and Express</p>
          </div>
        </main>
      </>
    );
  }
  
}