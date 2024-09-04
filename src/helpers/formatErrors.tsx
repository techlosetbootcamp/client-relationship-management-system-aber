export const FormatErrors = (errorMsgs: any) => {
  console.log("errorMsgs", errorMsgs);
  return Object.entries(errorMsgs)
    .flatMap(([key, messages]: any) =>
      messages.map((message: string) => `${message},`)
    )
    .join("\n");
};
