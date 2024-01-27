
// Drop down menu component for location selection
const LocationSelect = (props) => {
    const locations = props.data;

    return (
        <select onChange={props.handleDrop}>
            <option value='selectOne'>Select One</option>
            {locations.map(loc => (
                <option key={loc} value={loc}>{props.locations[loc]}</option>
            ))}
        </select>
    );
};

export default LocationSelect;