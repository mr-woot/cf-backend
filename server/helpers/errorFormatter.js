"use strict";

let requestErrors = require("request-promise/errors");

module.exports = app => {

    function createErrorObject (data) {

        return {
            status: data.status || 500,
            error: true,
            message: data.message,
            details: {
                message: data.details || "Some error occurred"
            }
        };
    }

    function createErrorObjectFromRequestError (error, message) {
        let errorObject;

        if (error instanceof requestErrors.StatusCodeError) {
            errorObject = error.error;
            errorObject.status = error.statusCode || 500;
        } else {
            errorObject = createErrorObject({
                status: error.status || 500,
                message: error.message || message || "Unexpected Error Occurred",
                details: error.details || error.message
            });
        }

        return errorObject;
    }

    return {
        createErrorObject,
        createErrorObjectFromRequestError
    };

};
