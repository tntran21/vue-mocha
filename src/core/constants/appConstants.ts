type TModeForm = "create" | "edit" | "view";

enum EModeForm {
  CREATE = "create",
  EDIT = "edit",
  VIEW = "view",
}

enum EStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

// URL to the API
const API_URL = process.env.VUE_APP_API_URL;

export { TModeForm, EModeForm, EStatusCode, API_URL };
