import React, { useEffect, useState } from "react";

const useInputName = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const [overLength, setOverLength] = useState(false);
  const onChange = (event) => {
    let isValid = true;
    if (typeof validator === "function") {
      isValid = validator(event.target.value);
    }

    if (isValid) {
      setOverLength(false);
      setValue(event.target.value);
    } else {
      setOverLength(true);
      setValue(event.target.value.substr(0, 10));
    }
  };

  return { value, onChange, overLength };
};

const useInputEmail = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const [golbaeng, setGolbaeng] = useState(true);
  const onChange = (event) => {
    if (typeof validator === "function")
      setGolbaeng(validator(event.target.value));

    setValue(event.target.value);
  };
  return { value, onChange, golbaeng };
};

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  return { currentItem: allTabs[currentIndex], changeItem: setCurrentIndex };
};

const contents = [
  { tab: "section 1", content: "Detail of the section 1" },
  { tab: "section 2", content: "Detail of the section 2" },
];

function App() {
  const maxLen = (value) => value.length <= 10;
  const golbaeng = (value) => value.includes("@");
  const name = useInputName("", maxLen);
  const email = useInputEmail("", golbaeng);
  const { currentItem, changeItem } = useTabs(0, contents);

  return (
    <div>
      <div>
        <h1>Hello</h1>
        <input placeholder="name" value={name.value} onChange={name.onChange} />
        <input
          placeholder="email"
          value={email.value}
          onChange={email.onChange}
        />
        {name.overLength ? <p>name should be less than 10 letters.</p> : null}
        {email.value === "" || email.golbaeng ? null : (
          <p>Please write correct email. </p>
        )}
      </div>
      <div>
        {contents.map((section, idx) => (
          <button key={idx} onClick={() => changeItem(idx)}>
            {section.tab}
          </button>
        ))}
      </div>
      <hr></hr>
      <div>
        <p>{currentItem.content}</p>
      </div>
    </div>
  );
}

export default App;
