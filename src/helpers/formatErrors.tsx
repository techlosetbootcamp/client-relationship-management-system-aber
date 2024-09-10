export const FormatErrors = (errorMsgs: any) => {
  return Object.entries(errorMsgs)
    .flatMap(([key, messages]: any) =>
      messages.map((message: string) => `${message},`)
    )
    .join("\n");
};
