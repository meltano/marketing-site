import { Resend } from "resend"

const resend = new Resend("re_FNmi2cwi_39A1euFCiqSjEAov7Zy66BT8")

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    try {

        const { email, receipt } =
            typeof req.body === "string" ? JSON.parse(req.body) : req.body

        const html = `
      <h2>Pricing Calculator Receipt</h2>

      <p><strong>Your Total:</strong> $${receipt.totalPrice}</p>
      <p><strong>Competitor Total:</strong> $${receipt.competitorTotal ?? "-"}</p>
      <p><strong>Total Savings:</strong> $${receipt.totalSavings ?? "-"}</p>

      <h3>Connectors</h3>

      <table border="1" cellpadding="10" cellspacing="0">
        <thead>
          <tr>
            <th>Connector</th>
            <th>Frequency</th>
            <th>Rows</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          ${receipt.connectors
                .map(
                    (c) => `
            <tr>
              <td>${c.name}</td>
              <td>${c.frequency}</td>
              <td>${Number(c.rowsPerMonth).toLocaleString()}</td>
              <td>$${c.cost}</td>
            </tr>
          `
                )
                .join("")}
        </tbody>
      </table>
    `

        const data = await resend.emails.send({
            from: "Pricing Calculator <onboarding@resend.dev>",
            to: email,
            subject: "Your Pricing Calculator Receipt",
            html
        })

        return res.status(200).json({ success: true, data })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            error: "Failed to send email"
        })

    }

}