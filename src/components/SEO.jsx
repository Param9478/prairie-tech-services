import { Helmet } from 'react-helmet-async'

const DEFAULT = {
    title: 'Prairie Tech Services | Web Development Alberta',
    description: 'Full-stack web development for Alberta businesses. Websites, e-commerce, and custom web apps — built right, delivered fast.',
    url: 'https://prairietechs.com',
    image: 'https://prairietechs.com/og-image.jpg',
}

export default function SEO({ title, description, path = '/', image }) {
    const fullTitle = title ? `${title} | Prairie Tech Services` : DEFAULT.title
    const fullDesc = description || DEFAULT.description
    const fullUrl = `${DEFAULT.url}${path}`
    const fullImage = image || DEFAULT.image

    return (
        <Helmet>
            {/* Basic */}
            <title>{fullTitle}</title>
            <meta name="description" content={fullDesc} />
            <meta name="keywords" content="web development Alberta, website design High Prairie, React developer, MERN stack, freelance web developer Canada, e-commerce Alberta" />
            <meta name="author" content="Prairie Tech Services" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={fullDesc} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:site_name" content="Prairie Tech Services" />
            <meta property="og:locale" content="en_CA" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={fullDesc} />
            <meta name="twitter:image" content={fullImage} />

            {/* Local SEO — Alberta */}
            <meta name="geo.region" content="CA-AB" />
            <meta name="geo.placename" content="High Prairie, Alberta" />
            <meta name="geo.position" content="55.4333;-116.4833" />
            <meta name="ICBM" content="55.4333, -116.4833" />
        </Helmet>
    )
}