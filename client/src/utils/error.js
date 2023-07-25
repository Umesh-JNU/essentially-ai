export default function getError(error) {
  console.log({ error })
  if (error.response) {
    if (error.response.data.error.message)
      return error.response.data.error.message
    return error.response;
  }
  return error.message;
}