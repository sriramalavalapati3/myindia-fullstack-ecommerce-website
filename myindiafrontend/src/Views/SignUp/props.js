import {
  submitUser
} from '../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  submitUser: (name, email, password, navigate) => dispatch(submitUser(name, email, password, navigate)),
});

export const mapStateToProps = (state) => ({

});