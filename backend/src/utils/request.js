function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Dữ liệu gửi lên không đúng định dạng JSON'));
      }
    });

    req.on('error', reject);
  });
}

module.exports = { readJsonBody };
