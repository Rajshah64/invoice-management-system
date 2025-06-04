import {MailtrapClient} from 'mailtrap';

const MAILTRAP_TOKEN = process.env.MAILTRAP_API_TOKEN!;
export const client =new MailtrapClient({token: MAILTRAP_TOKEN})


  