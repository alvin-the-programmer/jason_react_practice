import { useState, useEffect, useCallback } from 'react';
import MessageItem from './MessageItem';
import MessageCreateForm from './MessageCreateForm';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(45);

  const getMessages = useCallback(async () => { 
    const res = await fetch('http://localhost:3001/api/messages');
    const data = await res.json();
    
    setMessages(data);
  }, []);
  
  useEffect(() => {
    getMessages();

  }, [getMessages]);

  const handleChangePageSize = (e) => {
    setPage(0);
    setPageSize(e.target.value);
  };

  const start = page * pageSize;
  const end = start + pageSize;

  const messageItems = messages.slice(start, end).map((message, idx) => <MessageItem key={idx} message={message} />);

  const pageButtons = [];
    
  for (let i = 0; i < Math.ceil(messages.length / pageSize); i += 1) {
    pageButtons.push(<button key={i} onClick={() => setPage(i)}>{i}</button>);
  }

  // number of pages = total number of messages / 10
  // render only 10 messages depending on which page we are on, represented by the page State
  // also need page number of buttons to control render of messages
  
  // const messageItems = [];
  // if (messages.length > 0) {
  //   const start = page * 10;
  //   const end = start + 10;
  //   for (let i = start; i < end ; i += 1) {
  //     const message = messages[i];
  //     messageItems.push(<MessageItem key={i} message={message} />)
  //   }
  // }

  return (
    <div>
      <MessageCreateForm getMessages={getMessages} />
      <button onClick={getMessages}>Refresh</button>
      <label for="pageSize">Messages per Page:</label>
      <select name="pageSize" onChange={handleChangePageSize} value={pageSize}>
        <option value={10}>10</option>
        <option value={45}>45</option>
        <option value={100}>100</option>
      </select>
      <br />
      {pageButtons}
      <table>
        {messageItems}
      </table>
    </div>
  )
};

export default MessageList;