const { check, validationResult } = require('express-validator')

const userRegisterValidationRules = () => {

    return [
        //Name field validation
        check('name')
            .not()
            .isEmpty()
            .withMessage("Name field is required")
            //Name must be between 2 and 30 characters
            .isLength({ min: 4, max: 50 })
            .withMessage('Name must be between 4 and 50 characters')
            //Name is required
            .exists()
            .withMessage("Name field is required")
            // .isAlpha()
            // .withMessage('Must be only alphabetical chars')
            .trim(),

        //Email field validation
        check('lasuEmail')
            .not()
            .isEmpty()
            .withMessage("Email field is required")
            // email must be a valid email
            .isEmail()
            .withMessage("Email is invalid")
            // email is required
            .exists()
            .withMessage("Email field is required")
            .contains("@st.lasu.edu.ng")
            .withMessage("Email must be a LASU email"),

        //matricNumber field validation
        check('matricNumber').custom((value, { req }) => {
            if (value.substring(4, 6) !== "11" &&
                value.substring(4, 6) !== "21" &&
                value.substring(4, 6) !== "31") {
                throw new Error("Enter a valid Matric Number")
            }
            return true;
        })
            // matricNumber is required
            .exists()
            .withMessage("MatricNumber is required")
            .not()
            .isEmpty()
            .withMessage("MatricNumber is required")
            //matricNumber must be 9 characters
            .isLength({ min: 9, max: 9 })
            .withMessage('Enter a valid Matric Number'),

        //Gender field validation
        check('gender')
            // Genders is required
            .exists()
            .withMessage("Gender is required")
            .not()
            .isEmpty()
            .withMessage("Gender is required"),

        //Phone Number field validation
        check('phoneNumber')
            // phone number is required
            .exists()
            .withMessage("Phone Number is required")
            .not()
            .isEmpty()
            .withMessage("Phone Number is required"),

        //Password field validation
        check('password')
            .not()
            .isEmpty()
            .withMessage("Password field is required")
            // password must be at least 6 chars long
            .isLength({ min: 6, max: 30 })
            .withMessage('Password must be between 6 to 30 characters')
            // password is required
            .exists()
            .withMessage("Password field is required"),
        // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
        // .withMessage("Password must include one lowercase character, one uppercase character, a number, and a special character."),

        //Confirm Password field validation
        check('password2').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords must match")
            }
            return true;
        })
            // password2 is required
            .exists()
            .withMessage("Confirm password field is required")
            .not()
            .isEmpty()
            .withMessage("Confirm password field is required"),

    ]
}

const userLoginValidationRules = () => {
    return [
        //matricNumber field validation
        check('matricNumber')
            // matricNumber is required
            .exists()
            .withMessage("MatricNumber is required")
            .not()
            .isEmpty()
            .withMessage("MatricNumber is required")
            //matricNumber must be 9 characters
            .isLength({ min: 9, max: 9 })
            .withMessage('Enter a valid Matric Number'),

        //Password field validation
        check('password')
            // password is required
            .exists()
            .withMessage("Password field is required")
            .not()
            .isEmpty()
            .withMessage("Password field is required"),
    ]
}

const userProfileValidationRules = () => {
    return [
        //Home Address field validation
        check('homeAddress')
            // Home Addresss is required
            .exists()
            .withMessage("Home Address field is required"),

        //faculty field validation
        check('faculty')
            // faculty is required
            .exists()
            .withMessage("Faculty field is required"),
        //department field validation
        check('department')
            // department is required
            .exists()
            .withMessage("Department field is required"),
        //dateOfBirth field validation
        check('dateOfBirth')
            // dateOfBirth is required
            .exists()
            .withMessage("Date Of Birth field is required"),
        //Dad Phone Number field validation
        check('dadPhoneNumber')
            // Dad Phone Number is required
            .exists()
            .withMessage("Dad Phone Number is required"),
        //Mom phone number field validation
        check('momPhoneNumber')
            // Mom phone number is required
            .exists()
            .withMessage("Mom Phone Number field is required"),
    ]
}

const userUpdateProfileValidationRules = () => {
    return [
        //Name field validation
        check('name')
            //Name must be between 2 and 30 characters
            .isLength({ min: 2, max: 30 })
            .withMessage('Name must be between 2 and 30 characters')
            .trim(),

        //Email field validation
        // check('lasuEmail')
        // email must be a valid email
        // .isEmail()
        // .withMessage("Email is invalid"),
        //matricNumber field validation
        check('matricNumber')
            //matricNumber must be 9 characters
            .isLength({ min: 9, max: 9 })
            .withMessage('Enter a valid Matric Number'),
    ]
}

const userProfileExperienceValidationRules = () => {
    return [
        //Title field validation
        check('title')
            // Title is required
            .exists()
            .withMessage("Job title field is required"),

        //Company field validation
        check('company')
            // Company is required
            .exists()
            .withMessage("Company field is required"),
        //Company field validation
        check('from')
            // Company is required
            .exists()
            .withMessage("From date field is required"),
    ]
}

const userProfileEducationValidationRules = () => {
    return [
        //School field validation
        check('school')
            // School is required
            .exists()
            .withMessage("School field is required"),

        //Degree field validation
        check('degree')
            // Degree is required
            .exists()
            .withMessage("Degree field is required"),
        //Field of study field validation
        check('fieldofstudy')
            // Field of study is required
            .exists()
            .withMessage("Field of study field is required"),
        //From date field validation
        check('from')
            // From date is required
            .exists()
            .withMessage("From date field is required"),
    ]
}

const userPostValidationRules = () => {
    return [
        //Text field validation
        check('text')
            // Text is required
            .exists()
            .withMessage("Text field is required")
            .isLength({ min: 2, max: 300 })
            .withMessage("Text must be between 2 and 300 characters"),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    }
    // const extractedErrors = []
    // errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    const extractedErrors = errors.array().reduce((acc, cur) => ({ ...acc, [cur.param]: cur.msg }), {})
    // const objExtractedErrors = extractedErrors.reduce((acc,cur) => ({...acc , }))

    return res.status(422).json({
        message: "Fill in all required fields",
        errors: extractedErrors,
    })
}

module.exports = {
    userRegisterValidationRules,
    userLoginValidationRules,
    userProfileValidationRules,
    userUpdateProfileValidationRules,
    userProfileExperienceValidationRules,
    userProfileEducationValidationRules,
    userPostValidationRules,
    validate,
}