import React, { useState } from 'react';
import { KanbanContext } from '../../App';
import '../DisplayButton/displayButton.css'

const DisplayButton = () => {
  const { groupingOption, setGroupingOption, displayOption, setDisplayOption, statusOptions } = React.useContext(KanbanContext);
  const [selectedStatus, setSelectedStatus] = useState(displayOption || statusOptions[0]);

  const handleGroupingChange = (event) => {
    setGroupingOption(event.target.value);
  };

  const handleDisplayChange = (event) => {
    setDisplayOption(event.target.value);
  };

  return (
    <div className="display-button">
      
    </div>
  );
};

export default DisplayButton;
