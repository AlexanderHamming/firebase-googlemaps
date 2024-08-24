import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useState } from "react";
import "../assets/SearchBar.scss"

const SearchBar = () => {
    const [input, setInput] = useState<string>("");

    const handleSearch = () => {

    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInput(value);
        console.log(input)
    };

    return (
        <InputGroup className="search-bar">
            <FormControl
                placeholder="What do you wish to eat...?"
                aria-label="What do you wish to eat..?"
                aria-describedby="basic-addon2"
                id="inputField"
                value={input}
                onChange={handleChange}
            />
            <Button variant="outline-secondary" id="button-addon" onClick={handleSearch}>
                Search
            </Button>
        </InputGroup>
    );
};

export default SearchBar;