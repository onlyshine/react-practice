import React, { useState } from 'react';
import * as Tone from 'tone';
import './App.css';

const notes = [
  "C2", "D2", "E2", "F2", "G2", "A2", "B2",
  "C3", "D3", "E3", "F3", "G3", "A3", "B3",
  "C4", "D4", "E4", "F4", "G4", "A4", "B4",
  "C5", "D5", "E5", "F5", "G5", "A5", "B5",
  "C6"
];
const numColumns = 16;

function App() {
  const [matrix, setMatrix] = useState(Array(numColumns).fill([]));

  const handleNoteClick = (col, note) => {
    const newMatrix = matrix.map((colNotes, colIndex) => 
      colIndex === col 
        ? colNotes.includes(note) 
          ? colNotes.filter(n => n !== note) 
          : [...colNotes, note] 
        : colNotes
    );
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, "16n");
    setMatrix(newMatrix);
  };

  function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }

  const playMusic = () => {
    const synth = new Tone.PolySynth().toDestination();
    const now=Tone.now();
    for(let i=0; i<numColumns; i++){
      const tempArr=[];
      for(let j=0; j<matrix[i].length; j++){
        tempArr.push(matrix[i][j]);
        synth.triggerAttack(matrix[i][j], now);
        
        //console.log(matrix[i][j]);
      }
      sleep(600);
      synth.triggerRelease(tempArr, now+0.5);
      
      
      
    }
  };

  return (
    <div className="App">
      <h1>Music Maker</h1>
      

      <select>
        <option value="">마디 수</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <select>
        <option value="">시작 음(0이 C2)</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      <select>
        <option value="">끝 음(28이 C6)</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      <select>
        <option value="">bpm</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <form>
        <label for="name">asdfasd</label>
        <input></input>
        <button>submit</button>
      </form>

      <button>Submit</button>

      <div className="matrix">
        {matrix.map((colNotes, col) => (
          <div key={col} className="column">
            {notes.map(note => (
              <div
                key={note}
                className={`note ${colNotes.includes(note) ? note[0] : ''}`}
                onClick={() => handleNoteClick(col, note)}
              >
                {note}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={playMusic}>Play</button>
    </div>
  );
}

export default App;
