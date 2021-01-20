"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class Transporter {
    constructor() {
        this.host = "smtp.ethereal.email";
        this.port = 587;
        this.secure = false;
        this.auth = {
            user: "bxvaat4b5ojdj4kc@ethereal.email",
            pass: "FMxPKqZ6H9CZTfQaRw"
        };
    }
    from(fromName = null, fromAddress = null) {
        if (!fromName && process.env.MAIL_FROM_NAME) {
            fromName = process.env.MAIL_FROM_NAME;
        }
        if (!fromAddress && process.env.MAIL_FROM_ADDRESS) {
            fromAddress = process.env.MAIL_FROM_ADDRESS;
        }
        return `"${fromName}" <${fromAddress}>`;
    }
    create() {
        return nodemailer_1.default.createTransport({
            host: this.host,
            port: this.port,
            secure: this.secure,
            auth: this.auth
        });
    }
}
exports.default = new Transporter();
