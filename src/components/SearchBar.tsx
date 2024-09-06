import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import "../assets/SearchBar.scss";
import { useNavigate } from 'react-router-dom';


interface SearchBarProps {
  onSearch: (address: string) => void;
  onLocateUser: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocateUser }) => {
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate(); 

  const handleSearch = () => {
    const trimmedLowerCaseInput = input.trim().toLocaleLowerCase();
    navigate(`/search?city=${trimmedLowerCaseInput}`);
        onSearch(trimmedLowerCaseInput); 
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
  };

  return (
    <InputGroup className="search-bar">
      <FormControl placeholder="What do you wish to eat...?" aria-label="What do you wish to eat..?" aria-describedby="basic-addon2" id="inputField" value={input} onChange={handleChange} />
      <Button variant="outline-secondary" id="button-addon" onClick={handleSearch}>
        Search
      </Button>
      <Button className="ms-1" variant="outline-secondary" id="locate-button" onClick={onLocateUser}>
        Near You
      </Button>
    </InputGroup>
  );
};

export default SearchBar;
