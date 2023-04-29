export const apiURL = (url: RequestInfo | URL) =>
  `${process.env.API_URL}/${url}`;
