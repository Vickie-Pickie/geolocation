const defaultState = {
  posts: [],
};

export default function createStore() {
  let state = null;
  const storageState = localStorage.getItem('timeline_state');
  if (!storageState) {
    state = defaultState;
  } else {
    state = JSON.parse(storageState);
  }

  return {
    saveState() {
      localStorage.setItem('timeline_state', JSON.stringify(state));
    },
    getPosts() {
      return state.posts;
    },
  };
}
