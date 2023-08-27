import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = './public/uploads'; // Specify the directory to save the uploaded images

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Upload failed.' });
      }

      const { url } = fields;
      const { image } = files;

      // Here, you can perform further processing like saving the image and name to a database

      res.status(200).json({ message: 'Upload successful.' });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
