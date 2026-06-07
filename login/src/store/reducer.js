import {combineReducers} from 'redux';
import {reducer as registerReducer} from '../pages/register/store';
//组合所有的reducer
export default combineReducers({
    register:registerReducer, //注册页面的reducer
});
