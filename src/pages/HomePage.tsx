import { Button, Form, InputGroup } from "react-bootstrap"

const HomePage = () => {
  return (
    <>
      <InputGroup className="mb-3" id="searchField">
        <Form.Control
          placeholder="What do you want to eat?"
          aria-label="What do you want to eat?"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon">
          Search
        </Button>
      </InputGroup>
    </>
  )
}

export default HomePage