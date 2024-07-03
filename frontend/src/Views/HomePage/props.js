import {
  getAllProducts
} from '../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(getAllProducts()),
});

export const mapStateToProps = (state) => ({
  allProductsData: state.allProductsData,
});