import styled from "styled-components";

// Simple Loading message when retrieving items from server
const Loading = () => {
    return (
        <Text>Processing...one moment please</Text>
    )
};

export default Loading;

const Text = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 30px;
    margin-top: 20vh;
`;