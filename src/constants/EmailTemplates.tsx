export const resetPasswordTemplate = (resetUrl:string) => {
    return `
              It seems like you forgot your password for Client Relationship Management system. If this is true, click the link below to reset your password.
              
              <br> <a href=${resetUrl}>Reset My password</a> <br>
              
              If you did not forget your password, please disregard this email.`;
  };