process.env.PATH = `${process.env.PATH}:${process.env.LAMBDA_TASK_ROOT}`;
const wkhtmltopdf = require("./utils/wkhtmltopdf");
const errorUtil = require("./utils/error");

exports.handler = function handler(event, context, callback) {
    if (!event.body) {
        const errorResponse = errorUtil.createErrorResponse(400, "Validation error: Missing body'.");
        callback(errorResponse);
        return;
    }

    const body = JSON.parse(event.body);

    if (!body.html) {
        const errorResponse = errorUtil.createErrorResponse(400, "Validation error: Missing html field'.");
        callback(errorResponse);
        return;
    }
    const res = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        }
    };
    wkhtmltopdf(body.html)
        .then(buffer => {
            res.body = {
                data: buffer.toString("base64")
            };
            callback(null, res);
        }).catch(error => {
            callback(errorUtil.createErrorResponse(500, "Internal server error", error));
        });
};