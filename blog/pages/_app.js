import App from "next/app";
import 'antd/dist/antd.css'
import '../styles/globals.css'
import '../static/style/pages/comm.css'     /*全局使用css*/

function MyApp({Component, pageProps}) {
    return <Component {...pageProps} />
}

export default MyApp
