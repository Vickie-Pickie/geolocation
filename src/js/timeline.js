import { Modal } from 'bootstrap';
import validateCoords from './validateCoords';

function formatDate(timestamp) {
  const date = new Date(timestamp);
  let today = date.getDate();
  let month = date.getMonth() + 1;
  if (today < 10) {
    today = `0${today}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }
  return `${today}.${month}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

export default function initTimeline(store) {
  const form = document.getElementById('new_post');
  const myModal = new Modal(document.getElementById('exampleModal'));
  const sendCoordsBtn = document.getElementById('send_coords');
  const coordsInput = document.getElementById('geo_input');
  const listEl = document.getElementById('post_list');
  const posts = store.getPosts();

  const drawPost = (postObj) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post-item');


    const contentEl = document.createElement('div');
    contentEl.classList.add('post-item_content');

    const textEl = document.createElement('div');
    textEl.classList.add('post-item_text');
    textEl.textContent = postObj.content;

    const coordsEl = document.createElement('div');
    coordsEl.classList.add('post-item_coords');
    coordsEl.textContent = postObj.geo;

    contentEl.append(textEl, coordsEl);

    const dateEl = document.createElement('div');
    dateEl.classList.add('post-item_date');
    dateEl.textContent = formatDate(postObj.date);

    postEl.append(contentEl, dateEl);

    listEl.prepend(postEl);
  };

  const createPostObject = (content, coords) => {
    const post = {
      content,
      date: Date.now(),
      geo: coords,
    };
    posts.push(post);
    store.saveState();
    drawPost(post);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.elements.content.value) {
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          createPostObject(form.elements.content.value, `${latitude}, ${longitude}`);
          form.elements.content.value = '';
        }, () => {
          myModal.show();
        },
      );
    }
  };

  const onSendCoordsClick = () => {
    if (!validateCoords(coordsInput.value)) {
      coordsInput.classList.add('is-invalid');
      return;
    }
    coordsInput.classList.remove('is-invalid');

    createPostObject(form.elements.content.value, coordsInput.value);
    myModal.hide();
    coordsInput.value = '';
    form.elements.content.value = '';
  };

  posts.forEach((post) => drawPost(post));

  form.addEventListener('submit', onSubmit);
  sendCoordsBtn.addEventListener('click', onSendCoordsClick);
}
