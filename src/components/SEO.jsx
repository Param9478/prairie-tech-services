import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, path }) {
    const domain = "https://prairietechs.com";
    const fullTitle = `${title} | Prairie Tech Services`;
    const url = `${domain}${path || ""}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${domain}/og-preview.png`} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${domain}/og-preview.png`} />

            <link rel="canonical" href={url} />
        </Helmet>
    );
}