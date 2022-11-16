import React, { useState } from 'react';
import Home from './Home';
import TitleChanger from './TitleChanger';
import './App.css';
import WindowTracker from './WindowTracker';
import CustomHook from './CustomHook';
import FocusableInput from './FocusableInput';
import UglyClass from './UglyClass';
import FancyButton from '../small/FancyButton';
import TicTacToe from './TicTacToe';

const pages = {
  home: {
    name: 'Home',
    component: Home,
  },
  titleChanger: {
    name: 'Title Changer',
    component: TitleChanger,
  },
  windowTracker: {
    name: 'Window Tracker',
    component: WindowTracker,
  },
  customHook: {
    name: 'Custom Hook',
    component: CustomHook,
  },
  focusableInput: {
    name: 'Focusable Input',
    component: FocusableInput,
  },
  uglyClass: {
    name: 'Ugly Class',
    component: UglyClass,
  },
  ticTacToe: {
    name: 'Tic Tac Toe',
    component: TicTacToe,
  },
};

function App() {
  const [currentPage, setCurrentPage] = useState('ticTacToe');
  const CurrentComponent = pages[currentPage].component;
  return (
    <div className="app">
      <nav className="app-navigation">
        {Object.entries(pages).map(([pageKey, pageData]) => (
          //pagekey seria el nombre del elemento en el objeto pages(por ejemplo ticTacToe), y pageData todo lo que esta dentro del objeto(name y component)
          <FancyButton
            active={pageKey === currentPage}
            key={pageKey}
            navigation
            onClick={() => setCurrentPage(pageKey)}
          >
            {pageData.name}
          </FancyButton>
          
        ))}
      </nav>
      <header className="app-page-title">{pages[currentPage].name}</header>
      <div className="app-content">
        <CurrentComponent name={pages[currentPage].name} />
      </div>
    </div>
  );
}

export default App;
