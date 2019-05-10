import {combineReducers} from 'redux';
import products from './products.reducer';

const reducer = combineReducers({
    products,
});

export default reducer;
