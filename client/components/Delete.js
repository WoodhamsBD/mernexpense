import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Delete extends React.Component {
  constructor() {
    super();
    this.state = { 
      id: '', 
      month: '', 
      year: '' 
    };

    // Function binding
    this.onClick = this.onClick.bind(this);
    this.delete = this.delete.bind(this);
  }

  // Lifecycle
  componentDidMount() {
    this.setState({
      id: this.props.expense._id,
      month: this.props.expense.month,
      year: this.props.expense.year
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.expense._id,
      month: nextProps.expense.month,
      year: nextProps.expense.year
    })
  }

  // Click handler
  onClick(e) {
    this.delete(this);
  }

  // API delete for expense
  delete(e) {
    axios.get('/delete?id=' + e.state.id)
      .then(function (response) {
      });
  }

  // Display
  render() {
    return (
      <Button bsStyle="danger" bsSize="small" onClick={this.onClick}>
        <Link to={{ pathname: '/', search: '?month=' + this.state.month + '&year=' + this.state.year }} style={{ textDecoration: 'none' }}>
          <span className="glyphicon glyphicon-remove"></span>
        </Link>
      </Button>
    )
  }
}

export default Delete;