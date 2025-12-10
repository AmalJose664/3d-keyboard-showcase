import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const forwardedFor = request.headers.get("x-forwarded-for");
	const ip = forwardedFor
		? forwardedFor.split(",")[0].trim()
		: request.headers.get("x-real-ip") || "unknown";
	console.log(ip,)

	const API_KEY = process.env.DATA_SENT_SECRET
	if (API_KEY) {

		await fetch('https://ping-forge.vercel.app/api/v1/events', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + API_KEY
			},
			body: JSON.stringify({
				category: "solyra",
				description: "keyboard site new visit",
				fields: {
					ip: ip, // for example: user id
					userAgent: request.headers.get("user-agent") || "not found"
				}
			})
		})
	} else {
		console.log("no api key")
	}
	return Response.json({ message: 'Hello from Next.js!', ip });
}
