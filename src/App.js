import React, { Component } from 'react'
class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoading: false,
      isError: false
    }
  }
  async componentDidMount(){
    this.setState({ isLoading: true })
    
	const response=await fetch('https://books-api-data.herokuapp.com/datasets')
    if (response.ok) {
      const users = await response.json()
      this.setState({ users, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }
  renderTableHeader = () => {
    return Object.keys(this.state.users[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)
  }
  renderTableRows = () => {
    return this.state.users.map(user => {
      return (
        <tr>
          <td>{user.Id}</td>
          <td>{user.BookName}</td>
          <td>{user.Author}</td>
          <td>{user.UserRating}</td>
           <td>{user.Review}</td>
          <td>{user.Price}</td>
          <td>{user.Year}</td> 
         
        </tr>
      )
    })
  }
  render() {
    const { users, isLoading, isError } = this.state
  
    if (isLoading) {
      return <div>Loading...</div>
    }
  
    if (isError) {
      return <div>Error</div>
    }
  
    return users.length > 0
      ? (
        <td>
        <table id="data">
          <thead>
            <tr>
              {this.renderTableHeader()}
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
        </td>
      ) : (
        <div>
          No users.
      </div>
      )
  }
};


export default Table