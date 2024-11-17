
import emailjs, { EmailJSResponseStatus } from "emailjs-com";

export default async function handler(req: { method: string; body: { to_name: any; from_name: any; time: any; message: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; response?: EmailJSResponseStatus; error?: unknown; }): any; new(): any; }; }; }) {
  if (req.method === "POST") {
    const { to_name, from_name, time, message } = req.body;

    try {
      const response = await emailjs.send(
        "service_z16dtz9", // Replace with your Service ID
        "template_4j6rkxp", // Replace with your Template ID
        {
          to_name,
          from_name,
          time,
          message,
        },
        "5SDFJB3Dvejs6P0n8" // Replace with your User ID
      );

      return res.status(200).json({ message: "Email sent successfully", response });
    } catch (error) {
      console.error("Failed to send email:", error);
      return res.status(500).json({ message: "Failed to send email", error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
