import ProductPage from "./ProductPage";
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from "./props";
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);