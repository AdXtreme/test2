exports.handler = async function (event) {
  const rand = (len) =>
    Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join("");

  const randomName = () => {
    const first = ["Andrew", "John", "Michael", "David", "Chris"];
    const last = ["Henry", "Smith", "Brown", "Taylor", "Wilson"];
    return `${first[Math.floor(Math.random() * first.length)]} ${
      last[Math.floor(Math.random() * last.length)]
    }`;
  };

  const randomExpiry = () => {
    const year = 2026 + Math.floor(Math.random() * 6);
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    return `${year}/${month}`;
  };

  const params = new URLSearchParams(event.queryStringParameters || {});
  const key = event.queryStringParameters?.key || "KW-TEST-00000000-0000";

  const response = {
    success: true,
    card: {
      key,
      category: rand(4),
      expires_at: new Date(Date.now() + 86400000 * 30).toISOString(),
      activated_at: new Date().toISOString(),
      status: "used"
    },
    content: {
      card_number: rand(16),
      expiry_date: randomExpiry(),
      cvv: rand(3),
      phone: "+1" + rand(10),
      sms_api: "https://adxtreme.github.io/x",
      name: randomName(),
      address: "Random Address, USA"
    }
  };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(response)
  };
};
