/**
 * 
 */


import * as EmailValidator from 'email-validator';
import { User } from '../contexts/Types';


export function validateSignUp(formData: User): string {

    if (!formData.email || !EmailValidator.validate(formData.email)) 
        return "Please enter a valid email address";

    if (!formData.password || formData.password.length < 4)
        return "Password must be at least 4 characters";

    if (formData.password !== formData.passwordConfirm)
        return "Passwords must match";
    
    if (!formData.name || 
        formData.name.length < 3 || formData.name.length > 20)
        return "Names must be between 3 and 20 characters";

    if (!formData.birthDate)
        return "Please select a date of birth";

    if (formData.phone && 
        (formData.phone.length < 6 || formData.phone.length > 20))
        return "Phone number must be between 6 and 20 digits (optional field)";

    return "ok";
}


export function validateSignIn(formData: User): string {

    if (!formData.email || !EmailValidator.validate(formData.email)) 
        return "Please enter a valid email address";

    if (!formData.password || formData.password.length < 4)
        return "Password must be at least 4 characters";

    return "ok";
}
