import { transporter } from "../utils/env";

export const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    html?: string,
): Promise<string> => {
    try {
        const info = await transporter.sendMail({
            from: 'Final Project - BE NodeJS - Leonardho', to, subject, text, html,
        });
    
        return `${subject} has been sended`
    } catch (error) {
        throw new Error("Failed to send email."+error)
    }
};
  