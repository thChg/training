import React, { Component } from "react";
import classes from "../../css/masterPage/footer/Footer.module.css";
import { GoTriangleUp } from "react-icons/go";

const RECORD_PER_PAGE = [10, 30, 50, 100, 200];
const BASE_ACTIONS = ["DESELECT"];
const ACTIONS = ["PRINT", "DELETE"];

export class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownVisible: false,
      actionDropDownVisible: false,
    };

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleActionDropDown = this.toggleActionDropDown.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSelectPage = this.handleSelectPage.bind(this);
    this.handleSetRecordPerPage = this.handleSetRecordPerPage.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  toggleDropDown() {
    this.setState((prevState) => ({
      dropDownVisible: !prevState.dropDownVisible,
    }));
  }

  toggleActionDropDown() {
    this.setState((prevState) => ({
      actionDropDownVisible: !prevState.actionDropDownVisible,
    }));
  }

  handleEnter(event) {
    const value = parseInt(event.target.value);
    if (event.key !== "Enter" || value == this.props.currentPage) {
      return;
    }
    if (
      isNaN(value) ||
      value < 1 ||
      value > Math.ceil(this.props.recordLength / this.props.recordPerPage)
    ) {
      alert("Please enter a valid page number.");
      event.target.value = "";
      return;
    }
    this.props.onSelectPage(parseInt(event.target.value));
    event.target.value = "";
  }

  handleSelectPage(event) {
    if (event.target.value == this.props.currentPage) {
      return;
    }
    this.props.onSelectPage(parseInt(event.target.value));
  }

  handleSetRecordPerPage(event) {
    const value = parseInt(event.target.value);
    this.props.onSelectRecordPerPage(value);
    this.setState({ dropDownVisible: false });
  }

  renderPageButtons() {
    const { recordLength, recordPerPage, currentPage } = this.props;
    const buttons = [];
    const totalPages = Math.max(1, Math.ceil(recordLength / recordPerPage));

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={currentPage === i ? classes.active : classes.inactive}
            value={i}
            onClick={this.handleSelectPage}
          >
            {i}
          </button>
        );
      }
    } else {
      const arr = [];
      for (let i = 1; i <= 3; i++) {
        const element =
          currentPage <= 2
            ? Math.max(i, currentPage - (2 - i))
            : Math.min(totalPages - (3 - i), currentPage - (2 - i));
        arr.push(
          <button
            key={i}
            className={
              currentPage === element ? classes.active : classes.inactive
            }
            value={element}
            onClick={this.handleSelectPage}
          >
            {element}
          </button>
        );
      }
      buttons.push(arr);
      buttons.push(
        <div className={classes.dot}>
          <input type="text" placeholder="..." onKeyUp={this.handleEnter} />
        </div>
      );
      const page = currentPage >= totalPages - 1 ? 1 : totalPages;
      buttons.push(
        <button
          key={1}
          className={classes.inactive}
          value={page}
          onClick={this.handleSelectPage}
        >
          {page}
        </button>
      );
    }

    return totalPages > 5 && currentPage >= totalPages - 1
      ? buttons.reverse()
      : buttons;
  }

  handleActionClick(event) {
    const action = event.target.value;
    
    switch (action) {
      case "DESELECT":
        this.props.onDeselectAll(null, true);
        break;
      case "PRINT":
        this.props.onPrint();
        break;
      case "DELETE":
        this.props.onDeleteRecords();
        break;
    }
    this.toggleActionDropDown();
  }

  render() {
    const { dropDownVisible, actionDropDownVisible } = this.state;
    const { recordLength, recordPerPage, selectedRecords, permissions } =
      this.props;
    const userActions = BASE_ACTIONS.map((action) => (
      <button value={action} onClick={this.handleActionClick} key={action}>
        {action}
      </button>
    )).concat(
      ACTIONS.map(
        (action) =>
          permissions.includes(action.toLowerCase()) && (
            <button value={action} onClick={this.handleActionClick}>
              {action}
            </button>
          )
      )
    );
    return (
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          <div className={classes.recordCount}>
            Found {recordLength} record(s).
          </div>
          {selectedRecords.length > 0 && (
            <div className={classes.actionContainer}>
              <div
                className={classes.actions}
                onClick={this.toggleActionDropDown}
              >
                <div>Actions... </div>
                <GoTriangleUp size={15} />
              </div>
              with {selectedRecords.length} record(s).
              <div
                className={
                  actionDropDownVisible
                    ? classes.actionDropDown
                    : classes.disabled
                }
                style={{
                  top: `calc(-12px - (${userActions.length} - 1) * 26px)`,
                }}
              >
                {userActions}
              </div>
            </div>
          )}
        </div>
        <div className={classes.pagination}>
          {this.renderPageButtons()}
          <div className={classes.recordPerPage} onClick={this.toggleDropDown}>
            {recordPerPage} (Records / page)
            <GoTriangleUp size={15} />
          </div>
          <div
            className={dropDownVisible ? classes.dropDown : classes.disabled}
          >
            {RECORD_PER_PAGE.map((item) => (
              <button onClick={this.handleSetRecordPerPage} value={item} key={item}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
