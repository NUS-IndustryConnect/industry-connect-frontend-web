import React, { useState } from 'react';

import './index.css';

export default function SelectTable(props) {
  const {
    headers,
    data = [],
    dataToRow,
    idKey,
    className="",
    actions
  } = props;

  const [selections, setSelections] = useState([]);
  // updating a single checkbox
  const updateSelections = (id, checked) => {
    if (checked) { // add to selections
      setSelections(prevSelections => prevSelections.concat([id]));
    } else { // remove from selections
      setSelections(prevSelections => prevSelections.filter(
        elem => elem !== id
      ));
    }
  }

  // "select all" checkbox
  const allIDs = data.map(d => d[idKey]);
  const selectAll = () => setSelections(allIDs);
  const selectNone = () => setSelections([]);
  const toggleAll = event => event.target.checked ? selectAll() : selectNone();

  return data.length === 0
  ? <p>No items.</p>
  : (
    <React.Fragment>
      <table className={className + " select-table"}>
        <thead>
          <tr>
            <th><input type="checkbox" onChange={toggleAll} /></th>
            { headers.map(h => <th key={h}>{h}</th>) }
          </tr>
        </thead>
        <tbody>
          { data.map(d => dataToRow(d,
            <input
              type="checkbox"
              checked={selections.includes(d[idKey])}
              onChange={(event) => updateSelections(d[idKey], event.target.checked)}
            />)) }
        </tbody>
      </table>
      { (selections.length > 0 && actions) ?
        <div className="actions">
          { actions.map(({ label, className, onClick }) => 
            <button
              key={label}
              className={className}
              onClick={() => {
                onClick(selections)
                selectNone();
              }}
            >
              {label}
            </button>)}
        </div> :
        null }
    </React.Fragment>
  );
}
