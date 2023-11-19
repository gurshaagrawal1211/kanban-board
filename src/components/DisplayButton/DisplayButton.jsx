import React, { useContext, useState } from 'react';
import { KanbanContext } from '../../App';
 import '../DisplayButton/displayButton.css'

const DisplayButton = () => {
  const { groupingOption, setGroupingOption, displayOptionsVisible, setDisplayOptionsVisible, orderingOption, setOrderingOption, } =useContext(KanbanContext);
  

  const handleDisplayButtonClick = () => {
    setDisplayOptionsVisible(!displayOptionsVisible);
  };

  const handleGroupingOptionChange = (option) => {
    setGroupingOption(option);
  };

  const handleOrderingOptionChange = (option) => { 
    setOrderingOption(option);
  };

  return (
    <div className="display-button">
      <header>
          <div className="display-container">
            <button className='btn'  onClick={handleDisplayButtonClick}>Display</button>
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
    </div>
  );
};

export default DisplayButton;
