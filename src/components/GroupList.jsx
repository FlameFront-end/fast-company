import PropTypes from 'prop-types'

const GroupList = ({
	items,
	valueProperty,
	contentProperty,
	onItemSelect,
	selectedItem
}) => {
	return (
		<ul className='list-group'>
			{Object.keys(items).map(item => (
				<li
					className={
						'list-group-item' + (items[item] === selectedItem ? ' active' : '')
					}
					key={items[item][valueProperty]}
					onClick={() => onItemSelect(items[item])}
					role='button'
				>
					{items[item][contentProperty]}
				</li>
			))}
		</ul>
	)
}

GroupList.defaultProps = {
	valueProperty: '_id',
	contentProperty: 'name'
}

GroupList.prototype = {
	items: PropTypes.object.isRequired,
	valueProperty: PropTypes.string.isRequired,
	contentProperty: PropTypes.string.isRequired,
	onItemSelect: PropTypes.func.isRequired,
	selectedItem: PropTypes.object.isRequired
}

export default GroupList