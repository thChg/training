import { Component } from "react";
import PageContext from "./PageContext";

class PageProvider extends Component {
  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);
    
    this.state = {
      currentPage: "Employee",
      handlePageChange: this.handlePageChange,
    };

  }
  handlePageChange(name) {
    this.setState({ currentPage: name });
  }
  render() {
    return (
      <PageContext.Provider value={this.state}>
        {this.props.children}
      </PageContext.Provider>
    );
  }
}

export default PageProvider;
