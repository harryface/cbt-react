import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/navbar';
import AuthService from './services/auth';
import eventBus from './services/common/eventbus';

function App() {

  // useEffect(() => {
  //   eventBus.on("logout", AuthService.logout());
  //   return () => {
  //     eventBus.remove("logout", AuthService.logout());
  //   };
  // }, []);

  return (
    <>
      <NavBar/>

      <Outlet/>
    </>
  );
}

export default App;
