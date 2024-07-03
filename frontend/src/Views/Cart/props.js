import {
getAllCartProducts
} from '../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
    getAllCartProducts : () =>(dispatch(getAllCartProducts()))
});

export const mapStateToProps = (state) => ({
    cartItems: state.cartItems,
});