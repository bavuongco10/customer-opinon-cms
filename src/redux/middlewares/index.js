import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const middleware = [thunk, promise];

export default middleware;
