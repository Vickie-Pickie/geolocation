import createStore from './store';
import initTimeline from './timeline';

const store = createStore();
initTimeline(store);
