import React from "react";
import "./Textbox.css";

export default class Input extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            active: (props.locked && props.active) || false,
            value: props.value || "",
            error: props.error || "",
            label: props.label || "Label"
        };
    }

    changeValue(event) {
        const value = event.target.value;
        this.setState({ value, error: "" });
    }

    render() {
        const { active, value, error, label } = this.state;
        const { locked } = this.props;
        const fieldClassName = `field ${(locked ? active : active || value) &&
            "active"} ${locked && !active && "locked"}`;

        return (
            <div className={fieldClassName}>
                <input
                    id={1}
                    type="text"
                    value={value}
                    placeholder={label}
                    onChange={this.changeValue.bind(this)}
                    onFocus={() => !locked && this.setState({ active: true })}
                    onBlur={() => !locked && this.setState({ active: false })}
                />
                <label htmlFor={1} className={error && "error"}>
                    {error || label}
                </label>
            </div>
        );
    }
}
