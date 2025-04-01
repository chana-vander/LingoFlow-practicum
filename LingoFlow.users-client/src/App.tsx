// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/header.tsx';
// import TopicsList from './components/topic.tsx';
// import Details from './components/topice-details.tsx';
// import Login from './components/login.tsx';
// import HomePage from './components/home.tsx';
// import Register from './components/register.tsx';
// import Levels from './components/level.tsx';
// import AboutUs from './components/about-us.tsx';
// function App() {
//   return (
//     <Routes>
//       <Route path="/h" element={<Header/>}/>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/choose-level" element={<Levels/>}/>
//       <Route path="/:level/topics" element={<TopicsList />}/>
//       <Route path="/topics/:id" element={<Details />} />
//       <Route path="/abaut-us" element={<AboutUs/>}/>

//       {/* דף 404 (אופציונלי) */}
//       {/* <Route path="*" element={<NotFoundPage />} /> */}
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route } from 'react-router-dom';
import Header from './components/header.tsx';
import TopicsList from './components/topic.tsx';
import Details from './components/topice-details.tsx';
import Login from './components/login.tsx';
import HomePage from './components/home.tsx';
import Register from './components/register.tsx';
import Levels from './components/level.tsx';
import AboutUs from './components/about-us.tsx';

function App() {
  return (
    <>
      {/* ה-Header יוצג בכל המסכים */}
      <Header />

      {/* מערכת הניווט */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/choose-level" element={<Levels />} />
        <Route path="/:level/topics" element={<TopicsList />} />
        <Route path="/topics/:id" element={<Details />} />
        <Route path="/abaut-us" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;
