/**
 * 
 */

export const signUpSchema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 3, maxLength: 20 },
      email: { type: "string", format:"email", minLength: 5, maxLength: 30 },
      password: { type: "string", minLength: 4, maxLength: 30 },
      passwordConfirm: { type: "string", minLength: 4, maxLength: 30 },
      phone: { type: "string", minLength: 6, maxLength: 20 },
      birthDate: { type: "string"},
      // role: { type: "string", maxLength: 20 },
    },
    required: ["name", "email", "password", "passwordConfirm"],
    additionalProperties: false
  }


  export const signInSchema = {
    type: "object",
    properties: {
      email: { type: "string", format:"email", minLength: 5 },
      password: { type: "string", minLength: 4 },
    },
    required: ["email", "password"],
    additionalProperties: false
  }

  // limit product titles 35 chars


  // module.exports = {
  //   signUpSchema, signInSchema
  // }
