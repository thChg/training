import React, { Component } from "react";
import classes from "../../css/modules/components/Pagination.module.css";
import { GoTriangleUp } from "react-icons/go";

const RECORD_PER_PAGE = [30, 50, 100, 200];

export class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownVisible: false,
    };
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.handleSetRecordPerPage = this.handleSetRecordPerPage.bind(this);
  }

  toggleDropDown() {
    this.setState((prevState) => ({
      dropDownVisible: !prevState.dropDownVisible,
    }));
  }

  handleSetRecordPerPage(event) {
    const { self } = this.context;
    const { onSetRecordPerPage } = self;

    onSetRecordPerPage(event);
    this.toggleDropDown();
  }

  renderPageButtons() {
    const { self } = this.context;
    const { onPageSelect, state } = self;
    const { recordPerPage, currentPage, length } = state.data;

    const buttons = [];
    const totalPages = Math.max(1, Math.ceil(length / recordPerPage));

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={Number(currentPage) === i ? classes.active : classes.inactive}
            value={i}
            onClick={onPageSelect}
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
            onClick={onPageSelect}
          >
            {element}
          </button>
        );
      }
      buttons.push(arr);
      buttons.push(
        <div className={classes.dot}>
          <input type="text" placeholder="..." onKeyUp={this.onEnter} />
        </div>
      );
      const page = currentPage >= totalPages - 1 ? 1 : totalPages;
      buttons.push(
        <button
          key={1}
          className={classes.inactive}
          value={page}
          onClick={onPageSelect}
        >
          {page}
        </button>
      );
    }

    return totalPages > 5 && currentPage >= totalPages - 1
      ? buttons.reverse()
      : buttons;
  }

  render() {
    const { self } = this.context;
    const { recordPerPage } = self.state.data;
    const { dropDownVisible } = this.state;

    return (
      <div className={classes.pagination}>
        {this.renderPageButtons()}
        <div className={classes.recordPerPage} onClick={this.toggleDropDown}>
          {recordPerPage} (Records / page)
          <GoTriangleUp size={15} />
        </div>
        <div className={dropDownVisible ? classes.dropDown : classes.disabled}>
          {RECORD_PER_PAGE.map((item) => (
            <button
              onClick={this.handleSetRecordPerPage}
              value={item}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Pagination;
