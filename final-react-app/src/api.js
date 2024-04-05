const API_ROOT =
  process.env.REACT_APP_BACKEND_URL ?? 'https://api.realworld.io/api';

function serialize(object) {
  const params = [];

  for (const param in object) {
    if (Object.hasOwnProperty.call(object, param) && object[param] != null) {
      params.push(`${param}=${encodeURIComponent(object[param])}`);
    }
  }

  return params.join('&');
}

let token = null;

const agent = async (url, body, method = 'GET') => {
  const headers = new Headers();

  if (body) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Token ${token}`);
  }

  const response = await fetch(`${API_ROOT}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  let result;

  try {
    result = await response.json();
  } catch (error) {
    result = { errors: { [response.status]: [response.statusText] } };
  }

  if (!response.ok) throw result;

  return result;
};

const requests = {
  //Send a DELETE request
  del: (url) => agent(url, undefined, 'DELETE'),
  //Send a GET request
  get: (url, query = {}) => {
    if (Number.isSafeInteger(query?.page)) {
      query.limit = query.limit ? query.limit : 10;
      query.offset = query.page * query.limit;
    }
    delete query.page;
    const isEmptyQuery = query == null || Object.keys(query).length === 0;

    return agent(isEmptyQuery ? url : `${url}?${serialize(query)}`);
  },
  //Send a PUT request
  put: (url, body) => agent(url, body, 'PUT'),
  //Send a POST request
  post: (url, body) => agent(url, body, 'POST'),
};

const Auth = {
  //Get current user
  current: () => requests.get('/user'),
  //Login with email and password
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  //Register with username, email and password
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  //Update user
  save: (user) => requests.put('/user', { user }),
};

const Tags = {
  //Get all tags
  getAll: () => requests.get('/tags'),
};

const Articles = {
  //Get all articles
  all: (query) => requests.get(`/articles`, query),
  //Get all articles from author
  byAuthor: (author, page) =>
    requests.get(`/articles`, { author, limit: 5, page }),
  //Get all articles by tag
  byTag: (tag, page) => requests.get(`/articles`, { tag, page }),
  //Remove one article
  del: (slug) => requests.del(`/articles/${slug}`),
  //Favorite one article
  favorite: (slug) => requests.post(`/articles/${slug}/favorite`),
  //Get article favorited by author
  favoritedBy: (username, page) =>
    requests.get(`/articles`, { favorited: username, limit: 5, page }),
  //Get all articles in the user's feed
  feed: (page) => requests.get('/articles/feed', { page }),
  //Get one article by slug
  get: (slug) => requests.get(`/articles/${slug}`),
  //Unfavorite one article
  unfavorite: (slug) => requests.del(`/articles/${slug}/favorite`),
  //Update one article
  update: ({ slug, ...article }) =>
    requests.put(`/articles/${slug}`, { article }),
  //Create a new article
  create: (article) => requests.post('/articles', { article }),
};

const Comments = {
  // Create a new comment for article
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  //Remove one comment
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  //Get all comments for one article
  forArticle: (slug) => requests.get(`/articles/${slug}/comments`),
};

const Profile = {
  //Follow another user
  follow: (username) => requests.post(`/profiles/${username}/follow`),
  //Get the profile of an user
  get: (username) => requests.get(`/profiles/${username}`),
  //Unfollow another user
  unfollow: (username) => requests.del(`/profiles/${username}/follow`),
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  setToken: (_token) => {
    token = _token;
  },
};