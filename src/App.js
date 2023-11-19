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

  const handleDisplayButtonClick = () => {
    setDisplayOptionsVisible(!displayOptionsVisible);
  };

  const handleGroupingOptionChange = (option) => {
    setGroupingOption(option);
  };

  const handleOrderingOptionChange = (option) => { 
    setOrderingOption(option);
  };
  

  const contextValue = {
    data,
    groupingOption,
    setGroupingOption,
    orderingOption,
    setOrderingOption
  };


  return (
     <KanbanContext.Provider value={contextValue}>
       <div className="app">
        <header>
          <div className="display-container">
            <button  onClick={handleDisplayButtonClick}>Display</button>
            {displayOptionsVisible && (
              <div className="dropdown-container">
              <div className="dropdown-container-content">
                <h4>Grouping</h4>
                <select
                  value={groupingOption}
                  onChange={(e) => handleGroupingOptionChange(e.target.value)}
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                  {/* Add more options as needed */}
                </select>
              </div>


              <div className="dropdown-container-content">
                <h4>Ordering</h4>
                <select
                  value={orderingOption}
                  onChange={(e) => handleOrderingOptionChange(e.target.value)}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              
              </div>
            )}
          </div>
        </header>
        <KanbanBoard />
      </div>
     </KanbanContext.Provider>
  );
};

export default App;

