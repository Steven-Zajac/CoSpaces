
import handleNoUser from "../handlers/handleNoUser";
import useFetch from "../hooks/useFetch";
import Loading from "../Global/Loading";
import SingleReservation from "./SingleReservation";

import styled from "styled-components";

const Reservations = () => {

    handleNoUser(); // If no logged in user, cannot access this page
    const userId = localStorage.getItem('userId');
    const { isLoading, data } = useFetch(`/api/reservations/user/${userId}`)
    const sortedData = !isLoading && [...data].sort((a,b) => new Date(a.date) - new Date(b.date)); // Want to sort res by date

    // Create new reservation component/form
    // Modify will direct to another page (similar to the new reservation page)

    return (
        <Container>
            <Title>Upcoming reservations</Title>
            <ResContainer>
            {
                !isLoading && data.length ?
                (
                    <ResList>
                        <ul>
                            {sortedData.map(res => (
                                <SingleReservation resData={res} key={res._id} />
                            ))}
                        </ul>
                    </ResList>
                ) :
                !isLoading && !data.length ?
                (
                    <div>
                        <h1>No reservations</h1> 
                    </div>
                ) :
                <Loading />
            }
            <ButtonLink href="/reservations/new" rel="noopener noreferrer">
                <Button>New Reservation</Button>
            </ButtonLink>
            </ResContainer>
        </Container>
    );
};

export default Reservations;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
`;

const Title = styled.h1`

`;

const ResContainer = styled.div`
    display: flexbox;
    align-content: end;
`;

const ResList = styled.div`
    background-color: rgba(216, 233, 242, .3);
    min-width: 25vw;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;

`;


const ButtonLink = styled.a`
    display: flex;
    padding-top: 2rem;
    align-items: center;
    justify-content: end;
    text-decoration: none;
`;

const Button = styled.button`
    background-color: #ed952f;
    color: white;
    border-radius: 10px 10px;
    padding: 8px;
    font-size: 1rem;

    &:hover {
        background-color: #cbddf5;
    }

`;