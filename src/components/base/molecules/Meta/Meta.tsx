import NextHeadSeo from 'next-head-seo'

type Props = {
  title?: string
  description?: string
  ogImage?: string
  canonical?: string
  noindex?: boolean
}

const Meta = ({ title, description, ogImage, canonical, noindex = false }: Props) => {
  return (
    <NextHeadSeo
      title={`${title ? `${title} | ` : ''}`}
      description={description ?? ''}
      og={{
        image: ogImage ?? '',
      }}
      twitter={{
        card: 'summary_large_image',
      }}
      robots={noindex ? 'noindex, nofollow' : 'index, follow'}
      canonical={canonical}
    />
  )
}

export default Meta
