import SearchBar from "../components/SearchBar";
import GoogleMapp from "../components/GoogleMap";
import { Container } from "react-bootstrap";

const HomePage = () => {

    return (
        <>
            <Container id="searchMapContainer">
                <SearchBar />
                {/* <Image src="https://placehold.co/400" /> */}
                <GoogleMapp />
            //Add component for rendering lists
            </Container>

        </>
    );
}

export default HomePage;