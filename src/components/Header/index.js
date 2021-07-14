import Head from 'next/head'

import config from '../../config'

const Header = (props) => {
    return (
        <Head>
            <meta content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5,minimum-scale=1"/>
            <meta name="description" content=""/>
            <meta name="keywords" content=""/>
            <link rel="icon" href="/assets/images/favicon.png" type="image/x-icon" />
            <title>{props.pageTitle} - {config.SITE_NAME}</title>
        </Head>
    )
}

export default Header