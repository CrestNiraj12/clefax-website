import emailjs from "emailjs-com";
import { SERVICE_ID, USER_ID } from "../constants";

export const handleMailSend = (templateId, subject, name, send_to, obj) => {
    const serviceId = SERVICE_ID;
    const userID = USER_ID;
    var date = new Date();
    date = `${date
        .getDate()
        .toString()
        .padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
    emailjs
        .send(
            serviceId,
            templateId,
            {
                subject,
                date,
                name,
                send_to,
                ...obj
            },
            userID
        )
        .then(res => {
            console.log("Email successfully sent!");
        })
        .catch(err =>
            console.error(
                "Oh well, you failed. Here some thoughts on the error that occured:",
                err
            )
        );
};

export const generateTable = (products, total) => {
    var datas = "";
    products.forEach(({ name, qty, unit, subtotal, shop }, index) => {
        datas += `<tr style="height: 18px;">
                                                        <td style="width: 10%; height: 18px; padding: 5px">${index +
                                                            1}</td>
                                                        <td style="width: 60%; height: 18px; padding: 5px">${name}<br>Vendor: ${shop}</td>
                                                        <td style="width: 10%; height: 18px; padding: 5px; text-align:center;">${qty} ${unit}(s)</td>
                                                        <td style="width: 20%; height: 18px; padding: 5px; text-align:center;">£${subtotal
                                                            .toFixed(2)
                                                            .replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                ","
                                                            )}</td>
                                                    </tr>`;
    });
    return `<table style="border-collapse: collapse; width: 100%; height: 54px;" border="1">
                                <thead>
                                    <tr style="height: 18px; padding: 5px; background-color: #ed1d24; text-align: center;">
                                        <td style="width: 10%; height: 18px; padding: 5px"><span style="color: #ecf0f1; font-size: 10pt;">S/N</span></td>
                                        <td style="width: 60%; height: 18px; padding: 5px"><span style="color: #ecf0f1; font-size: 10pt;">Items</span></td>
                                        <td style="width: 10%; height: 18px; padding: 5px"><span style="color: #ecf0f1; font-size: 10pt;">Qty</span></td>
                                        <td style="width: 20%; height: 18px; padding: 5px"><span style="font-size: 10pt; color: #ecf0f1;">Total</span></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${datas}
                                    <tr style="height: 18px; padding: 5px">
                                        <td style="width: 10%; height: 18px; padding: 5px">&nbsp;</td>
                                        <td style="width: 60%; height: 18px; padding: 5px">&nbsp;</td>
                                        <td style="width: 10%; height: 18px; padding: 5px;text-align:center;">Subtotal</td>
                                        <td style="width: 20%; height: 18px; padding: 5px;text-align:center;">£${total
                                            .toFixed(2)
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )}</td>
                                    </tr>
                                    <tr style="height: 18px; padding: 5px">
                                        <td style="width: 10%; height: 18px; padding: 5px">&nbsp;</td>
                                        <td style="width: 60%; height: 18px; padding: 5px">&nbsp;</td>
                                        <td style="width: 10%; height: 18px; padding: 5px;text-align:center;">Total</td>
                                        <td style="width: 20%; height: 18px; padding: 5px;text-align:center;">£${total
                                            .toFixed(2)
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )}</td>
                                    </tr>
                                </tbody>
                            </table>`;
};
