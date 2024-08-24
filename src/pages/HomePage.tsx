import { useState } from "react";
import { Button, Form, Image, InputGroup } from "react-bootstrap";

const HomePage = () => {
  const [input, setInput] = useState<string>("");

  const handleSearch = () => {

  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
    console.log(input)
  };

  return (
    <>
      <InputGroup className="mb-3" id="searchField">
        <Form.Control
          placeholder="What do you want to eat?"
          aria-label="What do you want to eat?"
          aria-describedby="basic-addon2"
          value={input}
          onChange={handleChange}
        />
        <Button variant="outline-secondary" id="button-addon" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>
      <Image src="https://placehold.co/400" />
    </>
  );
}

export default HomePage;
