export default function getErrorMessage(error: any): string {
  if (error?.message && error?.message !== undefined) {
    return error?.message;
  } else if (Array.isArray(error)) {
    return error.map((err: any) => JSON.stringify(err)).join("\n");
  } else {
    return "An error as occured";
  }
}
