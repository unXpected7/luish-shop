
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
function Dropdowns({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
    const [data, setData] = useState([]);
  useEffect (() => { 
      axios.get('/api/categories').then(response => setData(response.data));
  }, [])
  const options = data.map(item => (
    <option key={item.name} value={item.name}>
        {item.name}
    </option>   
    ));
  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdowns;