import React from 'react';

const CommentItem = (props) => {
  return (
    <table>
     <tr>
      <td colspan="2" align="left">
        {props.text}
      </td>
     </tr>
     <tr>
      <td colspan="2" align="right">
        {props.author}
      </td>
     </tr>
     <tr>
      <td colspan="2">
        {props.date}
      </td>
     </tr>
     <tr>
      <td></td>
      <td>
        <button onClick={props.removeComment}>Удалить</button>
      </td>
     </tr>
    </table>
  );
}

export default CommentItem;
