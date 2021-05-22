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
      <button onClick={sendSyncMessage}>Send sync</button>
      <img src="https://picsum.photos/100" alt="pic from the interwebs" />
    </div>
  );
};

export default Home;
