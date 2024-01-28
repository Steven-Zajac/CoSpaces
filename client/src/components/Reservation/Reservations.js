import handleNoUser from "../../handlers/handleNoUser";
import useFetch from "../../hooks/useFetch";

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
            {
                !isLoading && data.length ?
                (   <ResContainer>
                        <Title>Upcoming reservations</Title>
                        <ResList>
                            <ul>
                                {sortedData.map(res => (
                                    <SingleReservation resData={res} key={res._id} />
                                ))}
                            </ul>
                        </ResList>
                        <ButtonLink href="/reservations/new" rel="noopener noreferrer">
                            <Button>New Reservation</Button>
                        </ButtonLink>
                    </ResContainer>
                ) :
                !isLoading && !data.length ?
                (
                    <NoResContainer>
                        <div>
                            <h1>No reservations</h1> 
                        </div>
                        <NoResButtonLink href="/reservations/new" rel="noopener noreferrer">
                            <NoResButton>New Reservation</NoResButton>
                        </NoResButtonLink>
                    </NoResContainer>
                ) :
                <Loading />
            }
        </Container>
    );
};

export default Reservations;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ResContainer = styled.div`
    display: flexbox;
    align-content: end;
    margin-top: 3rem;

`;

const ResList = styled.div`
    background-color: rgba(247,178,166, .3);;
    min-width: 25vw;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    border-radius: 25px 25px;
    border: solid black 1px;

`;

const NoResContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    margin-top: 3rem;
`;

const NoResButtonLink = styled.a`
    display: flex;
    padding-top: 2rem;
    align-items: center;
    justify-content: center;
    text-decoration: none;
`;

const NoResButton = styled.button`
    background-color: #ed952f;
    color: white;
    border-radius: 10px 10px;
    padding: 8px;
    font-size: 1rem;

    &:hover {
        background-color: #cbddf5;
    }

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