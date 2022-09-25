import "./DateSelector.css";

const DateSelector = ({title, min, max, selectedDate, onDateChange}) => {

    const onChange = (event) => {
        onDateChange(event.target.value);
    }

    return (
        <div className="date-selector">
            <div className="date-selector-title">{title}</div>
            <input type="date" min={min} max={max} value={selectedDate} onChange={onChange} required />
        </div>
    )
}

export default DateSelector;