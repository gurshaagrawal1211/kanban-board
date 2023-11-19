import React, { useState, useEffect, createContext } from 'react';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import './App.css';
import DisplayButton from './components/DisplayButton/DisplayButton';

export const KanbanContext = createContext();

const App = () => {

  useEffect(() => {
    console.log(Number(1));
  }, []);
  const [data, setData] = useState({
    tickets: [],
    users: [],
  });
  const [loading, setLoading] = useState(true); // Added loading state
  const [displayOptionsVisible, setDisplayOptionsVisible] = useState(false);
  const [groupingOption, setGroupingOption] = useState('status');
  const [orderingOption, setOrderingOption] = useState('priority');


  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment ');
        const jsonData = await response.json();
        setData(jsonData);
        
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
    };
    
    fetchData();
  }, []);


  useEffect(() => {
    const kanbanBoardData = JSON.parse(localStorage.getItem('kanban-board')) || {};
    setGroupingOption(kanbanBoardData.groupingOption || 'status');
    setOrderingOption(kanbanBoardData.orderingOption || 'priority');
  }, []);

  useEffect(() => {
    // Save to local storage whenever these options change
    localStorage.setItem('kanban-board', JSON.stringify({ groupingOption, orderingOption }));
  }, [groupingOption, orderingOption]);

  const contextValue = {
    data,
    groupingOption,
    setGroupingOption,
    orderingOption,
    setOrderingOption,
    displayOptionsVisible,
    setDisplayOptionsVisible
  };

  return (
     <KanbanContext.Provider value={contextValue}>
       <div className="app">
        <DisplayButton/>
        <KanbanBoard />
      </div>
     </KanbanContext.Provider>
  );
};

export default App;

