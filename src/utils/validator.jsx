import Joi from "joi";

const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.empty': 'Username is required',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username cannot exceed 30 characters',
        'string.alphanum': 'Username must only contain alphanumeric characters'
    }),
    email: Joi.string().email({ tlds: false }).required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please enter a valid email address'
    }),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }),
    confirmPassword: Joi.valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords must match',
        'any.required': 'Please confirm your password'
    }),
    storeName: Joi.string().min(2).max(50).required().messages({
        'string.empty': 'Store name is required',
        'string.min': 'Store name must be at least 2 characters long',
        'string.max': 'Store name cannot exceed 50 characters'
    }),
    address: Joi.string().min(5).max(100).required().messages({
        'string.empty': 'Address is required',
        'string.min': 'Address must be at least 5 characters long',
        'string.max': 'Address cannot exceed 100 characters'
    }),
    firstName: Joi.string().min(2).max(30).required().messages({
        'string.empty': 'First name is required',
        'string.min': 'First name must be at least 2 characters long',
        'string.max': 'First name cannot exceed 30 characters'
    }),
    lastName: Joi.string().min(2).max(30).required().messages({
        'string.empty': 'Last name is required',
        'string.min': 'Last name must be at least 2 characters long',
        'string.max': 'Last name cannot exceed 30 characters'
    }),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Please enter a valid phone number (10-15 digits)'
    }),
    categoryRestaurantId: Joi.number().integer().positive().required().messages({
        'number.base': 'Please select a category',
        'number.integer': 'Invalid category selection',
        'number.positive': 'Invalid category selection'
    })
});

export const registerCustomerSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/).required().messages({
        'string.pattern.base': 'Password must be at least 6 characters long and contain only letters and numbers',
        'any.required': 'Password is required'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).strip().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Confirm password is required'
    }),
    username: Joi.string().required().trim().messages({
        'any.required': 'Username is required',
        'string.empty': 'Username cannot be empty'
    }),
    firstName: Joi.string().required().trim().messages({
        'any.required': 'First name is required',
        'string.empty': 'First name cannot be empty'
    }),
    lastName: Joi.string().required().trim().messages({
        'any.required': 'Last name is required',
        'string.empty': 'Last name cannot be empty'
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).messages({
        'string.pattern.base': 'Phone number must be 10 digits'
    })
})

export const editProfileSchema = Joi.object({
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/).required().messages({
        'string.pattern.base': 'Password must be at least 6 characters long and contain only letters and numbers',
        'any.required': 'Password is required'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).strip().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Confirm password is required'
    }),
    firstName: Joi.string().required().trim().messages({
        'any.required': 'First name is required',
        'string.empty': 'First name cannot be empty'
    }),
    lastName: Joi.string().required().trim().messages({
        'any.required': 'Last name is required',
        'string.empty': 'Last name cannot be empty'
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).messages({
        'string.pattern.base': 'Phone number must be 10 digits'
    })
})

export const editProfileOwnerSchema = Joi.object({
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/).required().messages({
        'string.pattern.base': 'Password must be at least 6 characters long and contain only letters and numbers',
        'any.required': 'Password is required'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).strip().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Confirm password is required'
    }),
    storeName: Joi.string().required().trim().messages({
        'any.required': 'Store name is required',
        'string.empty': 'Store name cannot be empty'
    }),
    address: Joi.string().required().trim().messages({
        'any.required': 'Address is required',
        'string.empty': 'Address cannot be empty'
    }),
    firstName: Joi.string().required().trim().messages({
        'any.required': 'First name is required',
        'string.empty': 'First name cannot be empty'
    }),
    lastName: Joi.string().required().trim().messages({
        'any.required': 'Last name is required',
        'string.empty': 'Last name cannot be empty'
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).messages({
        'string.pattern.base': 'Phone number must be 10 digits'
    })
})

export const loginSchema = Joi.object({
    identity: Joi.alternatives().try(
        Joi.string().email({ tlds: false }),
        Joi.string().trim()
    ).required().messages({
        'any.required': 'Email or username is required',
        'string.empty': 'Email or username cannot be empty'
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/).required().messages({
        'any.required': 'Password is required',
        'string.pattern.base': 'Password must be at least 6 characters long and contain only letters and numbers'
    }),
})
export const validateLogin = (input) =>{
    const {error} = loginSchema.validate(input,{abortEarly:false})

    if(error){
        const formatError = error.details.reduce((prv,curr)=>{
            prv[curr.path[0]] = curr.message
            return prv
        },{})
        return formatError
    }
    return null
}
export const validateRegister = (input) => {
    const { error } = registerSchema.validate(input, { abortEarly: false });
    if(error){
        const formatError = error.details.reduce((prv,curr)=>{
            prv[curr.path[0]] = curr.message
            return prv
        },{})
        return formatError
    }
    return null
};
export const validateRegisterCustomer = (input) => {
    const { error } = registerCustomerSchema.validate(input, { abortEarly: false });
    if(error){
        const formatError = error.details.reduce((prv,curr)=>{
            prv[curr.path[0]] = curr.message
            return prv
        },{})
        return formatError
    }
    return null
};
export const validateEditProfile = (input) => {
    const { error } = editProfileSchema.validate(input, { abortEarly: false });
    if(error){
        const formatError = error.details.reduce((prv,curr)=>{
            prv[curr.path[0]] = curr.message
            return prv
        },{})
        return formatError
    }
    return null
};
export const validateEditProfileOwner = (input) => {
    const { error } = editProfileOwnerSchema.validate(input, { abortEarly: false });
    if(error){
        const formatError = error.details.reduce((prv,curr)=>{
            prv[curr.path[0]] = curr.message
            return prv
        },{})
        return formatError
    }
    return null
};
