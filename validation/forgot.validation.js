import Joi from 'joi'

export const forgotValidation = async (body) => {
    try {
        const schema = Joi.object({

            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),

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