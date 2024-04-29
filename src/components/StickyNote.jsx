import React, { useState, useEffect } from "react";


const StickyNote = ({ index, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(`list_${index}`));
    if (data !== null) {
      setTitle(data.title);
      setContent(data.content);
    }
  }, [index]);

  const handleKeyUp = () => {
    onSave(index, { title, content });
  };

  return (
    <li>
      <a href="#" contentEditable={true} onKeyUp={handleKeyUp}>
        <h2>{title}</h2>
        <p>{content}</p>
      </a>
    </li>
  );
};

const App = () => {
  const [notes, setNotes] = useState(Array.from({ length: 8 }, () => ({ title: "", content: "" })));

  const handleSave = (index, data) => {
    const newNotes = [...notes];
    newNotes[index] = data;
    setNotes(newNotes);
    localStorage.setItem(`list_${index}`, JSON.stringify(data));
  };

  return (
    <div>
      <ul>
        {notes.map((note, index) => (
          <StickyNote key={index} index={index} onSave={handleSave} />
        ))}
      </ul>
    </div>
  );
};

export default App;
