import handleDeleteReservation from "../handlers/handleDeleteReservation";
import styled from "styled-components";

const SingleReservation = ({ resData }) => {

    //const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const locations = {
        'downtown': 'CoSpaces Downtown Montreal',
        'rosemont': 'CoSpaces Vieux-Rosemont'
    };

    // Parse date data
    const date = new Date(resData.date);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return (
        <Container>
            <TextContainer>
                <Text>Date: {month} {day}, {year}</Text>
                <Text>Location: {locations[resData.location]}</Text>
            </TextContainer>
            <ButtonContainer>
                <a href={`/reservations/modify/${resData._id}`} rel="noopener noreferrer">
                    <Button>Modify</Button>
                </a>
                <Button onClick={() => handleDeleteReservation(resData._id)}>Delete</Button>
            </ButtonContainer>
        </Container>
    );
};

export default SingleReservation;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    padding: .5rem;
`;

const Text = styled.div`

`;

const TextContainer = styled.div`
    padding-bottom: .5rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 2rem;

`;

const Button = styled.button`
    background-color: #f2d2aa;
    color: black;
    border-radius: 5px 5px;
    padding: 5px;
    font-size: .75rem;

    &:hover {
        background-color: #cbddf5;
        color: white;
    }

`;