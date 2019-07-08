import React, { Component } from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
// import axios from 'axios';
// import List from './List'

export class App extends Component {
  state = {
    quotes: [],
    newQuoteData: {
      title: '',
      contents: ''
    },
    editQuoteData: {
      id: '',
      title: '',
      contents: ''
    },
    newQuoteModal: false,
    editQuoteModal: false
  };

  componentWillMount() {
   this._refreshQuotes()
  }

  toggleNewQuoteModal() {
    this.setState({
      newQuoteModal: !this.state.newQuoteModal
    });
  }

  addQuote() {
    const newquote = this.state.newQuoteData;
    axios.post('http://localhost:8500/api/posts', newquote).then(res => {
      console.log(res.data);
      let { quotes } = this.state;

      quotes.push(res.data);

      this.setState({
        quotes,
        newQuoteModal: false,
        newQuoteData: {
          title: '',
          contents: ''
        }
      });
    });
  }

  toggleEditQuoteModal() {
    this.setState({
      editQuoteModal: !this.state.editQuoteModal
    });
  }

  editQuote(id, title, contents) {
    this.setState({
      editQuoteData: { id, title, contents },
      editQuoteModal: !this.state.editQuoteModal
    });
    console.log(id, title, contents);
  }

  updateQuote() {
    let { title, contents } = this.state.editQuoteData;
    axios
      .put(`http://localhost:8500/api/posts/${this.state.editQuoteData.id}`, {
        title,
        contents
      })
      .then(res => {
        console.log(res.data);
        this._refreshQuotes();
        this.setState({ editQuoteModal: !this.state.editQuoteModal, editBookData: {id:'', title: '', contents:''} });
      });
  }


  deleteQuote(id){
    axios.delete(`http://localhost:8500/api/posts/${id}`).then(res=>{
      console.log(res.data)
      this._refreshQuotes()
    })
  }

  _refreshQuotes() {
    axios.get('http://localhost:8500/api/posts').then(res => {
      this.setState({
        quotes: res.data
      });
    });
  }


  render() {
    const quotes = this.state.quotes.map(quote => {
      return (
        <tr key={quote.id}>
          <td>{quote.id}</td>
          <td>{quote.title}</td>
          <td>{quote.contents}</td>
          <td>
            <Button
              color="success"
              size="sm"
              className="mr-2"
              onClick={this.editQuote.bind(
                this,
                quote.id,
                quote.title,
                quote.contents
              )}
            >
              Edit
            </Button>{' '}
            <Button color="danger" size="sm" onClick={this.deleteQuote.bind(this, quote.id)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });
    return (
      <div className="App container">
        <h1>LOTR Quotes</h1>

        <Button
          className="my-3"
          color="primary"
          onClick={this.toggleNewQuoteModal.bind(this)}
        >
          Add Quote
        </Button>

        {/* New Quote Modal */}
        <Modal
          isOpen={this.state.newQuoteModal}
          toggle={this.toggleNewQuoteModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleNewQuoteModal.bind(this)}>
            Add New Quote
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                value={this.state.newQuoteData.title}
                onChange={e => {
                  let { newQuoteData } = this.state;

                  newQuoteData.title = e.target.value;

                  this.setState({ newQuoteData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="title">Contents</Label>
              <Input
                id="contents"
                value={this.state.newQuoteData.contents}
                onChange={e => {
                  let { newQuoteData } = this.state;

                  newQuoteData.contents = e.target.value;

                  this.setState({ newQuoteData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addQuote.bind(this)}>
              Add Quote
            </Button>{' '}
            <Button
              color="secondary"
              onClick={this.toggleNewQuoteModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* Edit Quote Modal */}
        <Modal
          isOpen={this.state.editQuoteModal}
          toggle={this.toggleEditQuoteModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleEditQuoteModal.bind(this)}>
            Edit Quote
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                value={this.state.editQuoteData.title}
                onChange={e => {
                  let { editQuoteData } = this.state;

                  editQuoteData.title = e.target.value;

                  this.setState({ editQuoteData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="title">Contents</Label>
              <Input
                id="contents"
                value={this.state.editQuoteData.contents}
                onChange={e => {
                  let { editQuoteData } = this.state;

                  editQuoteData.contents = e.target.value;

                  this.setState({ editQuoteData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateQuote.bind(this)}>
              Update Quote
            </Button>{' '}
            <Button
              color="secondary"
              onClick={this.toggleEditQuoteModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Contents</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>{quotes}</tbody>
        </Table>
      </div>
    );
  }
}

export default App;

// state = {
//   lotrQuotes: []
// };

// componentDidMount() {
//   axios.get('http://localhost:8500/api/posts/').then(res => {
//     console.log(res);
//     this.setState({ lotrQuotes: res.data });
//   });
// }

// render() {
//   return (
//     <div className="App">
//       <List getList={this.state.lotrQuotes}/>

//     </div>
//   );
// }
// }
