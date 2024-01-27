// Raises error, renders specific error or a generalized one
const RaiseError = ({ error }) => {
    return (
        error ? 
        <h1>{error}</h1> : 
        <h1>Unexplained error has occurred, please try again</h1>
    )
};

export default RaiseError;