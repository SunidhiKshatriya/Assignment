import React, { useState } from 'react';
import './App.css';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schemaSelections, setSchemaSelections] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const schemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];

  // Get remaining options not yet selected
  const getAvailableOptions = () =>
    schemaOptions.filter(
      (option) =>
        !schemaSelections.some((sel) => Object.keys(sel)[0] === option.value)
    );

  // Open popup
  const handleSaveSegmentClick = () => {
    setIsPopupOpen(true);
  };

  // Add selected schema to blue box
  const handleAddSchema = () => {
    if (selectedOption) {
      const selected = schemaOptions.find((opt) => opt.value === selectedOption);
      setSchemaSelections([...schemaSelections, { [selected.value]: selected.label }]);
      setSelectedOption(''); // Reset dropdown
    }
  };

  // Handle change in existing schema dropdowns
  const handleSchemaChange = (index, newValue) => {
    const newSelections = [...schemaSelections];
    const newLabel = schemaOptions.find((opt) => opt.value === newValue).label;
    newSelections[index] = { [newValue]: newLabel };
    setSchemaSelections(newSelections);
  };

  // Final submission
  const handleFinalSave = () => {
    const data = {
      schema: schemaSelections,
      segment_name: segmentName,

    };

    // Simulate sending data to server
    console.log('Sending data:', data);

   
    alert('Segment saved!');
    setIsPopupOpen(false);
    setSegmentName('');
    setSchemaSelections([]);
    setSelectedOption('');
  };

  return (
    <div className="App">
      <button onClick={handleSaveSegmentClick}>Save segment</button>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>Save Segment</h3>

            <div className="form-group">
              <label>Enter the name of the Segment:</label>
              <input
                type="text"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
                placeholder="Enter segment name"

              />
            </div>
            <p>To save your segment,you need to add the schemas to build the query.</p>
            <div className="form-group">
              <label>Add schema to segment:</label>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="">-- Select Schema --</option>
                {getAvailableOptions().map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button className="add-schema-btn" onClick={handleAddSchema}>
                +Add new schema
              </button>
            </div>

            {/* Blue box with selected schemas */}
            {schemaSelections.length > 0 && (
              <div className="blue-box">
                {schemaSelections.map((schema, index) => {
                  const selectedKey = Object.keys(schema)[0];
                  const availableOptions = schemaOptions.filter(
                    (opt) =>
                      !schemaSelections.some(
                        (s, i) => Object.keys(s)[0] === opt.value && i !== index
                      ) || opt.value === selectedKey
                  );

                  return (
                    <div key={index} className="schema-dropdown">
                      <select
                        value={selectedKey}
                        onChange={(e) => handleSchemaChange(index, e.target.value)}
                      >
                        {availableOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="button-group">
              <button onClick={handleFinalSave}>Save the segment</button>
              <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
