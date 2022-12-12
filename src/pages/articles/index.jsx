import Head from 'next/head'
import Image from 'next/image'

import { API_URL } from '@/config/index'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
// import { getAllArticles } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline lg:grid-cols-5">
      <Card className="md:col-span-3 lg:col-span-4">
        <div className="flex">
          <div>
            <Card.Title href={`/articles/${article.slug}`}>
              {article.title}
            </Card.Title>
            <Card.Eyebrow
              as="time"
              dateTime={article.date}
              className="md:hidden"
              decorate
            >
              {formatDate(article.date)}
            </Card.Eyebrow>
            <Card.Description>{article.introduction}</Card.Description>
            <Card.Cta>Read article</Card.Cta>
          </div>
          <div className="flex-shrink-0 sm:ml-4">
            <div className="relative w-full h-40 overflow-hidden bg-white border-none rounded-md sm:w-52">
              <Image
                src={article.coverImage}
                alt="Article image"
                fill
                className="object-cover"
              ></Image>
            </div>
          </div>
        </div>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="hidden mt-1 md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Articles - Spencer Sharp</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        />
      </Head>
      <SimpleLayout
        title="Writing on software design, company building, and the aerospace industry."
        intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex flex-col max-w-3xl space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/blogs`)
  const articles = await res.json()

  return {
    props: { articles },
    revalidate: 1,
  }
}
