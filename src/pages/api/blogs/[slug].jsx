const { blogs } = require('./data.json')

export default function handler(req, res) {
  const articles = blogs.filter((article) => article.slug === req.query.slug)

  if (req.method === 'GET') {
    res.status(200).json(articles)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  }
}
