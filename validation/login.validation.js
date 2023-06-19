import Joi from 'joi'

export const loginValidation = async (body) => {
    try {
        const schema = Joi.object({

            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9əıçşöğ]{3,30}$'))
                .required()
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