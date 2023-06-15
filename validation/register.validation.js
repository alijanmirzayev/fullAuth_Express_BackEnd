import Joi from 'joi'

export const registerValidation = async (body) => {
    try {
        const schema = Joi.object({
            fullname: Joi.string()
                .alphanum()
                .max(30),

            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9əıçşöğ]{3,30}$'))
        })
        const { error, value  } = schema.validate(body);

        if (error) {
            return error.details
        }
        return value
    }
    catch (err) {
        console.log(err)
    }
}