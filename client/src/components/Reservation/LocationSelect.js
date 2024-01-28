import styled from "styled-components";

// Drop down menu component for location selection
const LocationSelect = (props) => {
    const locations = props.data;

    return (
        <DropDown onChange={props.handleDrop}>
            <option value='selectOne'>Select One</option>
            {locations.map(loc => (
                <option key={loc} value={loc}>{props.locations[loc]}</option>
            ))}
        </DropDown>
    );
};

export default LocationSelect;

const DropDown = styled.select`
    border-radius: 5px 5px;
    text-align: center;
    padding: 1.5px;
`;