import {
    addProductToCart
} from '../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
    addProductToCart : (id) => dispatch(addProductToCart(id))
});

export const mapStateToProps = (state) => ({

});