import { useEffect } from 'react';

const Home = () => {
  // Listen for incoming async messages
  useEffect(() => {
    window.ipcRenderer.on('async-pong-1', (event, arg) => {
      console.log('[IPC_Renderer] (ASYNC) Received', arg);
    });
  }, []);

  // Send async messages
  const sendAsyncMessage = () => {
    window.ipcRenderer.send('async-ping-1', 'ASYNC PING 1');
  };
  const sendAsyncMessage2 = async () => {
    window.ipcRenderer
      .invoke('async-ping-2', 'ASYNC PING 2')
      .then((res) => console.log('[IPC_Renderer] (ASYNC) Received', res));
  };

  // Send sync messages
  const sendSyncMessage = () => {
    const response = window.ipcRenderer.sendSync('sync-ping-1', 'SYNC PING 1');
    console.log('[IPC_Renderer] (SYNC) Received', response);
  };

  return (
    <div>
      <h1>This is the home page</h1>
      <p>
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum{' '}
      </p>
      <button onClick={sendAsyncMessage}>Send async</button>
      <button onClick={sendAsyncMessage2}>Send async 2</button>
      <button onClick={sendSyncMessage}>Send sync</button>
    </div>
  );
};

export default Home;
