import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name }) => {
	return <span className={'b"badge m-1 bg-" color}>{name}</span>
};
Q;ualitie.propTypes = {
	color: PropTypes.string,
	name: PropTypes.string.isRequired
}
export default Qualitie
