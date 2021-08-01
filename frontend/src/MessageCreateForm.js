import { useState } from "react";

const MessageCreateForm = ({ getMessages }) => {
  const [alias, setAlias] = useState('');
  const [text, setText] = useState('');
  const [flash, setFlash] = useState({message: '', className: ''});
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormLoading) {
      setFlash({message: 'please wait before submitting again', className: 'flash flashError'})
      return;
     }
    
    if (alias.length === 0 || text.length === 0) {
      setFlash({message: 'cannot submit empty alias or text', className: 'flash flashError'});
      return;
    }

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({alias, text})
    }
    setIsFormLoading(true);

    fetch('http://localhost:3001/api/messages', config)
      .then((res) => {
        if (res.ok) {
          setIsFormLoading(false);
          setAlias('');
          setText('');
          setFlash({message: 'successfully submitted', className: 'flash flashSuccess'});
          getMessages();
         }
       });
  }

  const flashDiv = flash ? <div className={flash.className}>{flash.message}</div> : null;
  return (
    <>
    {flashDiv}
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <div className="formLabel">
          <label for="alias">alias: </label>
          <input type="text" id="alias" onChange={(e) => setAlias(e.target.value)} value={ alias }/>
        </div>
        <div className="formLabel">
          <label for="text">text:</label>
          <input type="text" id="text" onChange={(e) => setText(e.target.value)} value={text}/>
        </div>
        <input className="formSubmit" type="submit" value="Submit" />
      </form>
      </div>
    </>
  )

 
 };

export default MessageCreateForm;