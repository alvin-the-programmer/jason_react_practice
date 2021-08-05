const MessageItem = ({ message }) => {
  return (
    <tr>
      <td>{ message.alias }</td>
      <td>{ message.text }</td>
      <td>{ message.postedAt }</td>
    </tr>
  )
};

export default MessageItem;