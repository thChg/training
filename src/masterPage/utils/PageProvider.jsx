import { Component } from "react";
import PageContext from "./PageContext";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../subMenu/SubMenuMap";

class PageProvider extends Component {
  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectModule = this.handleSelectModule.bind(this);

    this.state = {
      currentPage: "Employee",
      currentModule: "System",
      handlePageChange: this.handlePageChange,
      handleSelectModule: this.handleSelectModule,
    };
  }

  componentDidMount() {}

  handlePageChange(name) {
    this.setState({ currentPage: name });
  }

  handleSelectModule(name) {
    this.setState({ currentModule: name });
  }
  render() {
    return (
      <PageContext.Provider value={this.state}>
        {this.props.children}
      </PageContext.Provider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageProvider);
