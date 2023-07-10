import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";

const useInputName = (initialName, validator) => {
  const [name, setName] = useState(initialName);
  const [overLength, setOverLength] = useState(false);
  const handleNameChange = useCallback((event) => {
    let isValid = true;
    if (typeof validator === "function") {
      isValid = validator(event.target.value);
    }

    if (isValid) {
      setOverLength(false);
      setName(event.target.value);
    } else {
      setOverLength(true);
      setName(event.target.value.substr(0, 10));
    }
  }, []);
  return { name, handleNameChange, overLength };
};

const useInputEmail = (initialEmail, validator) => {
  const [email, setEmail] = useState(initialEmail);
  const [atSign, setAtSign] = useState(true);
  const handleEmailChange = (event) => {
    if (typeof validator === "function")
      setAtSign(validator(event.target.value));

    setEmail(event.target.value);
  };
  return { email, handleEmailChange, atSign };
};

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  return { currentItem: allTabs[currentIndex], changeItem: setCurrentIndex };
};

const contents = [
  { tab: "section 1", content: "Detail of the section 1" },
  { tab: "section 2", content: "Detail of the section 2" },
];

const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};

const useClick = (onClick) => {
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []);
  return element;
};

function App() {
  const maxLen = (value) => value.length <= 10;
  const isIncluded = (value) => value.includes("@");
  const { name, handleNameChange, overLength } = useInputName("", maxLen);
  const { email, handleEmailChange, atSign } = useInputEmail("", isIncluded);
  const { currentItem, changeItem } = useTabs(0, contents);
  const titleUpdater = useTitle("Loading...");
  setTimeout(() => titleUpdater("Home", 3000));
  const sayHello = () => {
    console.log("Hello");
  };
  const title = useClick(sayHello);

  return (
    <div>
      <div>
        <h1>Hello {name}!</h1>
        <input placeholder="name" value={name} onChange={handleNameChange} />
        <input placeholder="email" value={email} onChange={handleEmailChange} />
        {overLength ? <p>name should be less than 10 letters.</p> : null}
        {email === "" || atSign ? null : <p>Please write correct email. </p>}
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
      <div>
        <button ref={title}>useRef practice: Hello in the console</button>
      </div>
    </div>
  );
}

export default App;
