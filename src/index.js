import React from 'react';
import ReactDOM from 'react-dom';
import CommentItem from './output';

let defaultComments = [
  {
    author: 'Here must be an author',
    text: 'Here must be a text',
    date: '01.02.2013, 03:00'
  },
]

class CommentApp extends React.Component {
  constructor() {
    super();

    //TODO взять state из localStorage
    let localStorage = window.localStorage;
    if (localStorage.length != 0) {
      let comments = JSON.parse(localStorage.getItem('comments'));
      this.state = {
        comments: comments,
        newAuthor: '',
        newText: '',
        newDate: ''
      }
    }
    else {
      this.state = { // Пока делаем набор текстов, потом будет работа с localStorage
        comments: defaultComments,
        newAuthor: '',
        newText: '',
        newDate: ''
      }
    }
  }

  addComment() {
    const comments = this.state.comments;
    let localStorage = window.localStorage;

    if (localStorage.length == 0) {
      comments.shift();
    }
    comments.push({
      author: this.state.newAuthor,
      text: this.state.newText,
      date: this.state.newDate,
    });
    this.setState({
      comments,
      newAuthor: '',
      newText: '',
      newDate: ''
    })
    //TODO сохранить стейт в localStorage

    localStorage.setItem('comments', JSON.stringify(comments))
  }

  getDate() {
    let date = new Date();

    let options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };

    return date.toLocaleString("ru", options);
  }

  removeComment(i) {
    const comments = this.state.comments;
    let localStorage = window.localStorage;

    comments.splice(i, 1);

    if (comments.length == 0) {
      localStorage.clear();
    }
    else{
      this.setState({
        comments,
        newAuthor: '',
        newText: '',
        newDate: ''
      })
    }
  }

  render() {
    return(
      <div>
        {
          this.state.comments.map((comment, i) => {
            return(
              <CommentItem
                key={i}
                text={comment.text}
                author={comment.author}
                date={comment.date}
                removeComment={this.removeComment.bind(this, i)}
              />
            )
          })
        }
        <table>
         <tr>
          <td colspan="2" align="left">
            <input
              type="text"
              placeholder="Автор"
              value={this.state.newAuthor}
              onChange={ev => {
                this.setState({ newAuthor: ev.target.value })
              }}
            />
          </td>
         </tr>
         <tr>
          <td colspan="2" align="right">
            <input
              type="text"
              placeholder="Комментарий"
              value={this.state.newText}
              onChange={ev => {
                this.setState({ newText: ev.target.value })
              }}
            />
          </td>
         </tr>
         <tr>
          <td colspan="2">
            <input
              type="text"
              value={this.getDate()}
              onMouseMove={ev => {
                this.setState({ newDate: ev.target.value })
              }}
            />
          </td>
         </tr>
         <tr>
          <td></td>
          <td>
            <button
              onClick={ev => {
                this.addComment();
              }}
            >Добавить</button>
          </td>
         </tr>
        </table>
      </div>
    )
  }
}

ReactDOM.render(
  <CommentApp />,
  document.querySelector('#app')
);
