import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UsersLoader extends Component {
  constructor (props) {
    super(props);
    this.state = {
      users: [],
      isFetching: true,
      isError: false,
    };
  }

  componentDidMount () {
    fetch('https://randomuser.me/api/?page=1&results=10&seed=FD2020-2')
      .then(res => res.json())
      .then(data => {
        const { results } = data;
        this.setState({
          users: results,
        });
      })
      .catch(() => {
        this.setState({
          isError: true,
        });
      })
      .finally(() => {
        this.setState({
          isFetching: false,
        });
      });
  }

  render () {
    const { users, isFetching, isError } = this.state;
    return (
      <div>
        <h1>USER LIST</h1>
        {isFetching && <div>LOADING...</div>}
        {/*isFetching ? <div>LOADING...</div> : null*/}
        {isError && <div>ERROR</div>}
        <ul>
          {users.map(user => {
            return (
              <li key={user.login.uuid}>{JSON.stringify(user, null, 4)}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

UsersLoader.propTypes = {};

export default UsersLoader;